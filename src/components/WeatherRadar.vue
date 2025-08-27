<template>
  <div class="weather-radar-container">
    <div class="radar-header">
      <h5 class="radar-title">
        <span class="radar-icon">🌧️</span>
        RainViewer 구름 레이더
      </h5>
      <div class="radar-info">
        <span class="update-time">{{ lastUpdate }}</span>
        <div class="radar-controls">
          <button 
            @click="previousFrame" 
            class="control-btn"
            :disabled="currentFrameIndex <= 0"
            title="이전 프레임"
          >
            ⏮️
          </button>
          <button 
            @click="toggleAnimation" 
            class="control-btn"
            :title="isAnimating ? '일시정지' : '재생'"
          >
            {{ isAnimating ? '⏸️' : '▶️' }}
          </button>
          <button 
            @click="nextFrame" 
            class="control-btn"
            :disabled="currentFrameIndex >= totalFrames - 1"
            title="다음 프레임"
          >
            ⏭️
          </button>
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
        
        <!-- RainViewer 서비스 제한 안내 -->
        <div v-if="!isLoading && !imageError && showServiceNotice" class="service-notice">
          <div class="notice-icon">ℹ️</div>
          <div class="notice-text">
            <p><strong>RainViewer 레이더 서비스</strong></p>
            <p>일부 지역에서는 레이더 데이터가 제한될 수 있습니다.</p>
          </div>
          <button 
            @click="closeServiceNotice" 
            class="notice-close"
            title="안내 닫기"
          >
            ×
          </button>
        </div>
        
        <!-- 프레임 정보 -->
        <div class="frame-info">
          <span class="frame-counter">{{ currentFrameIndex + 1 }} / {{ totalFrames }}</span>
          <span class="frame-time">{{ currentFrameTime }}</span>
        </div>
        
        <!-- 레이더 범례 -->
        <div class="radar-legend">
          <div class="legend-title">강수 강도</div>
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
    const radarData = ref(null)
    const refreshInterval = ref(null)
    const animationInterval = ref(null)
    const showServiceNotice = ref(true)
    
    // Leaflet 지도 관련
    let map = null
    let radarLayer = null
    
    // 애니메이션 상태
    const isAnimating = ref(false)
    const currentFrameIndex = ref(0)
    const animationSpeed = 1000 // 1초마다 프레임 변경

    // RainViewer API 엔드포인트
    const RAINVIEWER_API = 'https://api.rainviewer.com/public/weather-maps.json'
    
    // 범례 아이템
    const legendItems = [
      { color: 'light-rain', text: '약한 비' },
      { color: 'moderate-rain', text: '보통 비' },
      { color: 'heavy-rain', text: '강한 비' },
      { color: 'very-heavy-rain', text: '매우 강한 비' }
    ]

    // 총 프레임 수 계산
    const totalFrames = computed(() => {
      if (!radarData.value?.radar?.past) return 0
      return radarData.value.radar.past.length
    })

    // 현재 프레임 시간 표시
    const currentFrameTime = computed(() => {
      if (!radarData.value?.radar?.past || currentFrameIndex.value >= totalFrames.value) {
        return '데이터 없음'
      }
      
      const frame = radarData.value.radar.past[currentFrameIndex.value]
      const timestamp = frame.time * 1000
      const date = new Date(timestamp)
      return date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    })

    // 현재 시간 포맷팅
    const lastUpdate = computed(() => {
      if (!radarData.value) return '업데이트 중...'
      
      const timestamp = radarData.value.generated * 1000
      const date = new Date(timestamp)
      return date.toLocaleTimeString('ko-KR', {
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
      
      // 새 지도 생성
      map = L.map(mapContainer.value, {
        center: [props.latitude, props.longitude],
        zoom: 8,
        zoomControl: false, // 기본 줌 컨트롤 비활성화
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

    // RainViewer 레이더 레이어 추가 (공식 예제 방식)
    const addRadarLayer = () => {
      if (!map || !radarData.value?.radar?.past) return
      
      // 기존 레이더 레이어 제거
      if (radarLayer) {
        map.removeLayer(radarLayer)
      }
      
      try {
        const frame = radarData.value.radar.past[currentFrameIndex.value]
        const host = radarData.value.host
        const color = 2 // 색상 스키마 (2 = 표준)
        const options = '1_0' // smoothed, no snow
        
        // RainViewer 공식 타일 레이어 방식: {host}{path}/{z}/{x}/{y}/{color}/{options}.png
        const tileUrl = `${host}${frame.path}/{z}/{x}/{y}/${color}/${options}.png`
        
        console.log('RainViewer 레이더 타일 URL 생성:', {
          frameIndex: currentFrameIndex.value,
          frameTime: new Date(frame.time * 1000).toLocaleTimeString(),
          host,
          path: frame.path,
          color,
          options,
          tileUrl
        })
        
        // RainViewer 타일 레이어 생성 (공식 방식)
        radarLayer = L.tileLayer(tileUrl, {
          opacity: 0.7,
          attribution: '© RainViewer',
          maxZoom: 18,
          tileSize: 256,
          errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' // 투명 이미지
        }).addTo(map)
        
        // 타일 로딩 이벤트 처리
        radarLayer.on('tileerror', (e) => {
          console.warn('RainViewer 타일 로딩 실패:', e.tile.src)
        })
        
        radarLayer.on('tileload', (e) => {
          console.log('RainViewer 타일 로딩 성공')
        })
        
        console.log('RainViewer 레이더 타일 레이어 추가 완료')
        
      } catch (error) {
        console.error('레이더 레이어 추가 오류:', error)
        imageError.value = true
      }
    }

    // RainViewer API에서 레이더 데이터 가져오기
    const fetchRadarData = async () => {
      try {
        isLoading.value = true
        imageError.value = false
        
        console.log('RainViewer API에서 레이더 데이터 가져오는 중...')
        
        const response = await fetch(RAINVIEWER_API)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        radarData.value = data
        
        console.log('RainViewer 레이더 데이터 로드 성공:', data)
        
        // 가장 최근의 과거 레이더 데이터 사용
        if (data.radar && data.radar.past && data.radar.past.length > 0) {
          currentFrameIndex.value = data.radar.past.length - 1 // 가장 최근 프레임
          addRadarLayer()
        } else {
          throw new Error('사용 가능한 레이더 데이터가 없습니다')
        }
        
        // API 호출 성공 시 로딩 상태 해제
        isLoading.value = false
        
      } catch (error) {
        console.error('RainViewer API 오류:', error)
        imageError.value = true
        isLoading.value = false
      }
    }

    // 이전 프레임
    const previousFrame = () => {
      if (currentFrameIndex.value > 0) {
        currentFrameIndex.value--
        addRadarLayer()
      }
    }

    // 다음 프레임
    const nextFrame = () => {
      if (currentFrameIndex.value < totalFrames.value - 1) {
        currentFrameIndex.value++
        addRadarLayer()
      }
    }

    // 애니메이션 토글
    const toggleAnimation = () => {
      if (isAnimating.value) {
        stopAnimation()
      } else {
        startAnimation()
      }
    }

    // 애니메이션 시작
    const startAnimation = () => {
      if (totalFrames.value <= 1) return
      
      isAnimating.value = true
      animationInterval.value = setInterval(() => {
        if (currentFrameIndex.value >= totalFrames.value - 1) {
          currentFrameIndex.value = 0 // 처음으로 돌아가기
        } else {
          currentFrameIndex.value++
        }
        addRadarLayer()
      }, animationSpeed)
      
      console.log('레이더 애니메이션 시작')
    }

    // 애니메이션 정지
    const stopAnimation = () => {
      isAnimating.value = false
      if (animationInterval.value) {
        clearInterval(animationInterval.value)
        animationInterval.value = null
      }
      console.log('레이더 애니메이션 정지')
    }

    // 레이더 새로고침
    const refreshRadar = () => {
      console.log('레이더 새로고침 시작')
      stopAnimation()
      currentFrameIndex.value = 0
      fetchRadarData()
    }

    // 서비스 안내 닫기
    const closeServiceNotice = () => {
      showServiceNotice.value = false
      console.log('서비스 안내 닫힘')
    }

    // 자동 새로고침 설정 (10분마다)
    const startAutoRefresh = () => {
      refreshInterval.value = setInterval(() => {
        console.log('자동 레이더 새로고침 실행')
        refreshRadar()
      }, 10 * 60 * 1000) // 10분
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
      
      if (props.latitude && props.longitude) {
        // 지도 중심 이동
        if (map) {
          map.setView([props.latitude, props.longitude], 8)
        }
        
        // 레이더 데이터가 있으면 새 좌표로 업데이트
        if (radarData.value) {
          addRadarLayer()
        } else {
          fetchRadarData()
        }
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
        fetchRadarData()
        startAutoRefresh()
      }
    })

    onUnmounted(() => {
      stopAutoRefresh()
      stopAnimation()
      
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
      currentFrameIndex,
      totalFrames,
      currentFrameTime,
      isAnimating,
      showServiceNotice,
      refreshRadar,
      previousFrame,
      nextFrame,
      toggleAnimation,
      closeServiceNotice
    }
  }
}
</script>

<style lang="scss" scoped>
  @use '../styles/components/weatherRadar.module.scss' as weatherRadar;
</style>