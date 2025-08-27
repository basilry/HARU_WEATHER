<template>
  <div class="weather-radar-container">
    <div class="radar-header">
      <h5 class="radar-title">
        <span class="radar-icon">🌦️</span>
        {{ currentLayerInfo?.name }} 레이더
      </h5>
      <div class="radar-info">
        <span class="update-time">{{ lastUpdate }}</span>
        <div class="radar-controls">
          <!-- 레이어 선택 드롭다운 -->
          <select 
            v-model="selectedLayer" 
            @change="changeLayer(selectedLayer)"
            class="layer-selector"
            title="날씨 레이어 선택"
          >
            <option 
              v-for="layer in availableLayers" 
              :key="layer.key" 
              :value="layer.key"
            >
              {{ layer.name }}
            </option>
          </select>
          <button 
            @click="refreshRadar" 
            class="control-btn"
            title="새로고침"
          >
            🔄
          </button>
        </div>
      </div>
    </div>
    
    <div class="radar-content">
      <div 
        ref="radarContainer" 
        class="radar-map"
        :class="{ 'radar-loading': isLoading }"
      >
        <div v-if="isLoading" class="radar-loading-overlay">
          <div class="loading"></div>
          <span class="loading-text">레이더 로딩중...</span>
        </div>
        
        <!-- Leaflet 지도 컨테이너 -->
        <div ref="mapContainer" class="map-container"></div>
        
        <!-- OpenWeatherMap 서비스 안내 -->
        <div v-if="!isLoading && !imageError && showServiceNotice" class="service-notice">
          <div class="notice-icon">ℹ️</div>
          <div class="notice-text">
            <p><strong>OpenWeatherMap {{ currentLayerInfo?.name }} 레이더</strong></p>
            <p>{{ currentLayerInfo?.description }} 데이터를 실시간으로 제공합니다.</p>
          </div>
          <button 
            @click="closeServiceNotice" 
            class="notice-close"
            title="안내 닫기"
          >
            ×
          </button>
        </div>
        

        
        <!-- 레이더 범례 -->
        <div class="radar-legend">
          <div class="legend-title">{{ currentLayerInfo?.name }} 정보</div>
          <div 
            v-for="(item, index) in legendItems" 
            :key="index"
            class="legend-item"
          >
            <span :class="`legend-color ${item.color}`"></span>
            <span class="legend-text">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed, onUnmounted, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet-openweathermap'

export default {
  name: 'WeatherRadar',
  props: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    cityName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const radarContainer = ref(null)
    const mapContainer = ref(null)
    const isLoading = ref(false)
    const imageError = ref(false)
    const refreshInterval = ref(null)
    const showServiceNotice = ref(true)
    const selectedLayer = ref('clouds') // 기본 레이어: 구름
    
    // Leaflet 지도 관련
    let map = null
    let radarLayer = null
    
    // 사용 가능한 날씨 레이어 목록
    const availableLayers = [
      { key: 'clouds', name: '구름', description: '구름 덮개 정도' },
      { key: 'precipitation', name: '강수량', description: '비/눈 총 강수량' },
      { key: 'rain', name: '비', description: '비만 표시' },
      { key: 'snow', name: '눈', description: '눈만 표시' },
      { key: 'temperature', name: '기온', description: '지표면 온도' },
      { key: 'wind', name: '바람', description: '풍속 정보' },
      { key: 'pressure', name: '기압', description: '해수면 기압' }
    ]
    
    // 현재 선택된 레이어 정보
    const currentLayerInfo = computed(() => {
      return availableLayers.find(layer => layer.key === selectedLayer.value)
    })
    
    // 범례 아이템 (leaflet-openweathermap이 자동으로 제공)
    const legendItems = computed(() => {
      return [
        { color: 'auto', text: currentLayerInfo.value?.name || '날씨' },
        { color: 'auto', text: currentLayerInfo.value?.description || '정보' },
        { color: 'auto', text: 'OpenWeatherMap 제공' }
      ]
    })

    // 현재 시간 포맷팅
    const lastUpdate = computed(() => {
      const now = new Date()
      return now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    })

    // Leaflet 지도 초기화
    const initMap = () => {
      if (!mapContainer.value) return
      
      // 기존 지도 제거
      if (map) {
        map.remove()
      }
      
      // 새 지도 생성 (leaflet-openweathermap 최적화)
      map = L.map(mapContainer.value, {
        center: [props.latitude, props.longitude],
        zoom: 8,             // 일반적인 지역 보기 줌 레벨
        minZoom: 1,          // 최소 줌 레벨
        maxZoom: 18,         // OpenStreetMap 최대 줌 (OWM은 자동 관리)
        zoomControl: false,  // 기본 줌 컨트롤 비활성화
        attributionControl: false // 기본 attribution 비활성화
      })
      
      // OpenStreetMap 기본 타일 레이어 추가
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map)
      
      // 현재 위치 마커 추가
      L.marker([props.latitude, props.longitude])
        .addTo(map)
        .bindPopup(`<b>${props.cityName}</b><br>현재 위치`)
        .openPopup()
      
      console.log('Leaflet 지도 초기화 완료')
    }

    // OpenWeatherMap 구름 레이더 레이어 추가
    const addRadarLayer = () => {
      if (!map) return
      
      // 기존 레이더 레이어 제거
      if (radarLayer) {
        map.removeLayer(radarLayer)
      }
      
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY
        
        if (!apiKey) {
          console.warn('OpenWeatherMap API 키가 없어서 레이더를 표시할 수 없습니다.')
          showServiceNotice.value = true
          return
        }
        
        // leaflet-openweathermap 패키지 사용 (전문 라이브러리)
        console.log('leaflet-openweathermap 패키지로 날씨 레이더 생성:', {
          layerType: selectedLayer.value,
          hasApiKey: !!apiKey,
          note: 'L.OWM이 자동으로 모든 좌표 변환을 처리합니다'
        })
        
        // 선택된 레이어에 따라 동적으로 레이더 생성
        const layerOptions = {
          appId: apiKey,
          opacity: 0.6,
          showLegend: true,        // 기본 범례 표시
          legendPosition: 'bottomleft'
        }
        
        // 레이어 타입별 생성
        switch (selectedLayer.value) {
          case 'clouds':
            radarLayer = L.OWM.clouds(layerOptions)
            break
          case 'precipitation':
            radarLayer = L.OWM.precipitation(layerOptions)
            break
          case 'rain':
            radarLayer = L.OWM.rain(layerOptions)
            break
          case 'snow':
            radarLayer = L.OWM.snow(layerOptions)
            break
          case 'temperature':
            radarLayer = L.OWM.temperature(layerOptions)
            break
          case 'wind':
            radarLayer = L.OWM.wind(layerOptions)
            break
          case 'pressure':
            radarLayer = L.OWM.pressure(layerOptions)
            break
          default:
            radarLayer = L.OWM.clouds(layerOptions) // 기본값: 구름
        }
        
        radarLayer.addTo(map)
        
        console.log(`leaflet-openweathermap ${currentLayerInfo.value?.name} 레이더 추가 완료`)
        
      } catch (error) {
        console.error('레이더 레이어 추가 오류:', error)
        imageError.value = true
      }
    }

    // OpenWeatherMap 구름 레이더 초기화
    const initRadarLayer = () => {
      try {
        isLoading.value = true
        imageError.value = false
        
        console.log('OpenWeatherMap 구름 레이더 초기화 중...')
        
        // OpenWeatherMap은 실시간 타일을 제공하므로 별도 API 호출 불필요
        addRadarLayer()
        
        // 로딩 상태 해제
        isLoading.value = false
        
      } catch (error) {
        console.error('OpenWeatherMap 레이더 초기화 오류:', error)
        imageError.value = true
        isLoading.value = false
      }
    }



    // 레이더 새로고침
    const refreshRadar = () => {
      console.log('OpenWeatherMap 레이더 새로고침 시작')
      addRadarLayer()
    }

    // 서비스 안내 닫기
    const closeServiceNotice = () => {
      showServiceNotice.value = false
      console.log('서비스 안내 닫힘')
    }

    // 레이어 변경 함수
    const changeLayer = (layerKey) => {
      console.log('날씨 레이어 변경:', layerKey)
      selectedLayer.value = layerKey
      addRadarLayer() // 새 레이어로 레이더 업데이트
    }

    // 자동 새로고침 설정 (5분마다)
    const startAutoRefresh = () => {
      refreshInterval.value = setInterval(() => {
        console.log('자동 OpenWeatherMap 레이더 새로고침 실행')
        refreshRadar()
      }, 5 * 60 * 1000) // 5분
    }

    const stopAutoRefresh = () => {
      if (refreshInterval.value) {
        clearInterval(refreshInterval.value)
        refreshInterval.value = null
      }
    }

    // 좌표 변경 시 지도 및 레이더 업데이트
    watch([() => props.latitude, () => props.longitude], () => {
      console.log('레이더 좌표 변경 감지:', { 
        lat: props.latitude, 
        lon: props.longitude
      })
      
      if (props.latitude && props.longitude && map) {
        // 지도 중심 이동 (일반적인 지역 보기 줌 레벨)
        map.setView([props.latitude, props.longitude], 8)
        
        // 마커 업데이트
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            layer.setLatLng([props.latitude, props.longitude])
            layer.bindPopup(`<b>${props.cityName}</b><br>현재 위치`).openPopup()
          }
        })
        
        // 레이더 레이어는 전역적이므로 좌표 변경과 무관
        console.log('지도 중심 및 마커 업데이트 완료')
      }
    })

    onMounted(async () => {
      console.log('WeatherRadar 마운트됨:', {
        latitude: props.latitude,
        longitude: props.longitude,
        cityName: props.cityName
      })
      
      if (props.latitude && props.longitude) {
        // DOM이 렌더링된 후 지도 초기화
        await nextTick()
        initMap()
        initRadarLayer()
        startAutoRefresh()
      }
    })

    onUnmounted(() => {
      stopAutoRefresh()
      
      // 지도 정리
      if (map) {
        map.remove()
        map = null
      }
    })

    return {
      radarContainer,
      mapContainer,
      isLoading,
      imageError,
      lastUpdate,
      legendItems,
      showServiceNotice,
      refreshRadar,
      closeServiceNotice,
      // 새로운 레이어 선택 기능
      selectedLayer,
      availableLayers,
      currentLayerInfo,
      changeLayer
    }
  }
}
</script>

<style lang="scss" scoped>
  @use '../styles/components/weatherRadar.module.scss' as weatherRadar;
</style>