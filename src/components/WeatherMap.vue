<template>
  <div class="weather-map-container">
    <div 
      ref="mapContainer" 
      class="weather-map"
      :class="{ 'map-loading': isLoading }"
    >
      <div v-if="isLoading" class="map-loading-overlay">
        <div class="loading"></div>
        <span class="loading-text">지도 로딩중...</span>
      </div>
      <!-- 도시명을 지도 위에 오버레이로 표시 -->
      <div class="map-overlay-title">
        <span class="city-name">📍 {{ cityName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import L from 'leaflet'

export default {
  name: 'WeatherMap',
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
      default: '위치'
    },
    weather: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const mapContainer = ref(null)
    const map = ref(null)
    const marker = ref(null)
    const isLoading = ref(true)

    // 커스텀 아이콘 생성
    const createWeatherIcon = (weatherMain) => {
      const iconMap = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '🌨️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️',
        'Dust': '💨',
        'Sand': '💨',
        'Ash': '💨',
        'Squall': '💨',
        'Tornado': '🌪️'
      }
      
      const emoji = iconMap[weatherMain] || '📍'
      
      return L.divIcon({
        html: `<div class="custom-marker">${emoji}</div>`,
        className: 'weather-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
      })
    }

    // 지도 초기화
    const initMap = async () => {
      if (!mapContainer.value || map.value) return

      try {
        isLoading.value = true

        // 지도 생성
        map.value = L.map(mapContainer.value, {
          zoomControl: false,
          attributionControl: false,
          dragging: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: false
        }).setView([props.latitude, props.longitude], 11)

        // 타일 레이어 추가 (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 15,
          attribution: false
        }).addTo(map.value)

        // 날씨 아이콘으로 마커 추가
        const weatherIcon = createWeatherIcon(props.weather?.weather?.[0]?.main || 'Clear')
        marker.value = L.marker([props.latitude, props.longitude], {
          icon: weatherIcon
        }).addTo(map.value)

        // 팝업 추가
        if (props.weather) {
          const temp = Math.round(props.weather.main.temp)
          const description = props.weather.weather[0].description
          marker.value.bindPopup(`
            <div class="map-popup">
              <strong>${props.cityName}</strong><br>
              ${temp}°C - ${description}
            </div>
          `)
        }

        // 지도 로딩 완료
        map.value.whenReady(() => {
          // 지도가 완전히 로드된 후 중심 재조정
          setTimeout(() => {
            map.value.setView([props.latitude, props.longitude], 11)
            isLoading.value = false
          }, 100)
        })

      } catch (error) {
        console.error('지도 초기화 실패:', error)
        isLoading.value = false
      }
    }

    // 지도 위치 업데이트
    const updateMapLocation = () => {
      if (!map.value) return

      const newLatLng = [props.latitude, props.longitude]
      
      // 지도 중심 이동
      map.value.setView(newLatLng, 11)
      
      // 마커 위치 업데이트
      if (marker.value) {
        marker.value.setLatLng(newLatLng)
        
        // 날씨 정보 업데이트
        if (props.weather) {
          const weatherIcon = createWeatherIcon(props.weather.weather[0].main)
          marker.value.setIcon(weatherIcon)
          
          const temp = Math.round(props.weather.main.temp)
          const description = props.weather.weather[0].description
          marker.value.getPopup().setContent(`
            <div class="map-popup">
              <strong>${props.cityName}</strong><br>
              ${temp}°C - ${description}
            </div>
          `)
        }
      }
    }

    // props 변화 감지
    watch([() => props.latitude, () => props.longitude, () => props.weather], () => {
      if (map.value) {
        updateMapLocation()
      }
    })

    onMounted(() => {
      nextTick(() => {
        initMap()
      })
    })

    onUnmounted(() => {
      if (map.value) {
        map.value.remove()
      }
    })

    return {
      mapContainer,
      isLoading
    }
  }
}
</script>

<style scoped>
.weather-map-container {
  width: 100%;
  background: var(--card-background);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  margin: 0 auto;
}

.weather-map {
  height: 200px;
  position: relative;
  background: #f8f9fa;
}

.map-overlay-title {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 12px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  
  [data-theme="dark"] & {
    background: rgba(30, 41, 59, 0.95);
    color: var(--text-color);
  }
  
  .city-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-color);
  }
}

.map-loading {
  background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%),
              linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  animation: loading-stripes 1s linear infinite;
}

.map-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1000;
}

.loading-text {
  margin-top: 8px;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

@keyframes loading-stripes {
  0% { background-position: 0 0, 10px 10px; }
  100% { background-position: 20px 20px, 30px 30px; }
}

@media (max-width: 768px) {
  .weather-map-container {
    border-radius: 8px;
  }
  
  .weather-map {
    height: 180px;
  }
}
</style>

<style>
/* 전역 스타일 - Leaflet 마커 커스터마이징 */
.custom-marker {
  font-size: 24px;
  text-align: center;
  line-height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  border: 2px solid #4f46e5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.map-popup {
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  font-size: 0.9rem;
  padding: 4px;
}

.leaflet-popup-content-wrapper {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.leaflet-popup-tip {
  background: white;
}
</style>
