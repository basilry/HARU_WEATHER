<template>
  <div class="weather-radar-container">
    <div class="radar-header">
      <h5 class="radar-title">
        <span class="radar-icon">{{ layerInfo.icon }}</span>
        {{ layerInfo.title }}
      </h5>
      <div class="radar-info">
        <span class="update-time">{{ lastUpdate }}</span>
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
        
        <!-- OpenWeatherMap 레이더 타일 -->
        <div v-if="!isLoading" class="radar-tiles">
          <img 
            v-if="!imageError"
            :src="radarUrl" 
            :alt="`${cityName} 지역 구름 레이더`"
            class="radar-image"
            @load="onImageLoad"
            @error="onImageError"
          />
          <div v-else class="radar-error">
            <div class="error-icon">🌤️</div>
            <p class="error-text">레이더 데이터를 불러올 수 없습니다</p>
            <p class="error-subtext">일시적인 서비스 장애일 수 있습니다</p>
          </div>
        </div>
        
        <!-- 레이더 범례 -->
        <div class="radar-legend">
          <div 
            v-for="(item, index) in layerInfo.legend" 
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
import { ref, onMounted, watch, computed } from 'vue'

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
    },
    layerType: {
      type: String,
      default: 'clouds_new',
      validator: (value) => ['clouds_new', 'precipitation_new', 'pressure_new', 'wind_new', 'temp_new'].includes(value)
    }
  },
  setup(props) {
    const radarContainer = ref(null)
    const isLoading = ref(true)
    const imageLoaded = ref(false)
    const imageError = ref(false)

    // 레이어 정보
    const layerInfo = computed(() => {
      const layers = {
        clouds_new: {
          title: '구름 레이더',
          icon: '☁️',
          legend: [
            { color: 'light-clouds', text: '맑음' },
            { color: 'moderate-clouds', text: '구름' },
            { color: 'heavy-clouds', text: '흐림' }
          ]
        },
        precipitation_new: {
          title: '강수 레이더',
          icon: '🌧️',
          legend: [
            { color: 'light-rain', text: '약한 비' },
            { color: 'moderate-rain', text: '보통 비' },
            { color: 'heavy-rain', text: '강한 비' }
          ]
        },
        pressure_new: {
          title: '기압 레이더',
          icon: '🌪️',
          legend: [
            { color: 'low-pressure', text: '저기압' },
            { color: 'normal-pressure', text: '보통' },
            { color: 'high-pressure', text: '고기압' }
          ]
        },
        wind_new: {
          title: '풍속 레이더',
          icon: '💨',
          legend: [
            { color: 'light-wind', text: '약한 바람' },
            { color: 'moderate-wind', text: '보통 바람' },
            { color: 'strong-wind', text: '강한 바람' }
          ]
        },
        temp_new: {
          title: '온도 레이더',
          icon: '🌡️',
          legend: [
            { color: 'cold', text: '추움' },
            { color: 'mild', text: '보통' },
            { color: 'hot', text: '더움' }
          ]
        }
      }
      return layers[props.layerType] || layers.clouds_new
    })

    // 현재 시간 포맷팅
    const lastUpdate = computed(() => {
      const now = new Date()
      return now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    })

    // OpenWeatherMap 레이더 URL 생성
    const radarUrl = computed(() => {
      const lat = Math.round(props.latitude * 100) / 100
      const lon = Math.round(props.longitude * 100) / 100
      const zoom = 10
      
      // 타일 좌표 계산
      const n = Math.pow(2, zoom)
      const xtile = Math.floor((lon + 180) / 360 * n)
      const ytile = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n)
      
      // OpenWeatherMap 레이더 타일 URL
      const baseUrl = `https://tile.openweathermap.org/map`
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY
      
      return `${baseUrl}/${props.layerType}/${zoom}/${xtile}/${ytile}.png?appid=${apiKey}`
    })

    const onImageLoad = () => {
      imageLoaded.value = true
      isLoading.value = false
      imageError.value = false
      console.log('레이더 이미지 로드 성공:', radarUrl.value)
    }

    const onImageError = () => {
      imageError.value = true
      isLoading.value = false
      console.warn('레이더 이미지 로드 실패:', radarUrl.value)
    }

    // 좌표 변경 시 레이더 업데이트
    watch([() => props.latitude, () => props.longitude], () => {
      if (props.latitude && props.longitude) {
        isLoading.value = true
        imageLoaded.value = false
        imageError.value = false
      }
    })

    onMounted(() => {
      // 초기 로딩 상태 설정
      if (props.latitude && props.longitude) {
        isLoading.value = true
      }
    })

    return {
      radarContainer,
      isLoading,
      imageLoaded,
      imageError,
      lastUpdate,
      radarUrl,
      onImageLoad,
      onImageError
    }
  }
}
</script>

<style scoped>
.weather-radar-container {
  background: var(--card-background);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  height: fit-content;
}

.radar-header {
  padding: 16px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.radar-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.radar-icon {
  font-size: 1.2rem;
}

.radar-info {
  font-size: 0.8rem;
  opacity: 0.9;
}

.update-time {
  font-weight: 500;
}

.radar-content {
  position: relative;
}

.radar-map {
  height: 250px;
  position: relative;
  background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%),
              linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  overflow: hidden;
}

.radar-loading {
  background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%),
              linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 0 0, 10px 10px; }
  100% { background-position: 20px 20px, 30px 30px; }
}

.radar-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  [data-theme="dark"] & {
    background: rgba(30, 41, 59, 0.9);
  }
}

.loading {
  width: 40px;
  height: 40px;
  border: 3px solid var(--primary-color);
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 0.9rem;
  color: var(--text-color);
  font-weight: 500;
}

.radar-tiles {
  width: 100%;
  height: 100%;
  position: relative;
}

.radar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

.radar-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  
  .error-icon {
    font-size: 3rem;
    margin-bottom: 16px;
    opacity: 0.7;
  }
  
  .error-text {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0 0 8px 0;
  }
  
  .error-subtext {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin: 0;
  }
}

.radar-legend {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  display: flex;
  gap: 12px;
  
  [data-theme="dark"] & {
    background: rgba(30, 41, 59, 0.95);
  }
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  
  /* 구름 레이어 */
  &.light-clouds {
    background: linear-gradient(45deg, #87CEEB, #B0E0E6);
  }
  
  &.moderate-clouds {
    background: linear-gradient(45deg, #B0E0E6, #D3D3D3);
  }
  
  &.heavy-clouds {
    background: linear-gradient(45deg, #D3D3D3, #A9A9A9);
  }
  
  /* 강수 레이어 */
  &.light-rain {
    background: linear-gradient(45deg, #87CEEB, #4682B4);
  }
  
  &.moderate-rain {
    background: linear-gradient(45deg, #4682B4, #1E90FF);
  }
  
  &.heavy-rain {
    background: linear-gradient(45deg, #1E90FF, #000080);
  }
  
  /* 기압 레이어 */
  &.low-pressure {
    background: linear-gradient(45deg, #FF6B6B, #FF8E8E);
  }
  
  &.normal-pressure {
    background: linear-gradient(45deg, #4ECDC4, #44A08D);
  }
  
  &.high-pressure {
    background: linear-gradient(45deg, #45B7D1, #96C93D);
  }
  
  /* 풍속 레이어 */
  &.light-wind {
    background: linear-gradient(45deg, #E8F5E8, #C8E6C9);
  }
  
  &.moderate-wind {
    background: linear-gradient(45deg, #FFF9C4, #FFF59D);
  }
  
  &.strong-wind {
    background: linear-gradient(45deg, #FFCC02, #FF9800);
  }
  
  /* 온도 레이어 */
  &.cold {
    background: linear-gradient(45deg, #E3F2FD, #BBDEFB);
  }
  
  &.mild {
    background: linear-gradient(45deg, #F3E5F5, #E1BEE7);
  }
  
  &.hot {
    background: linear-gradient(45deg, #FFEBEE, #FFCDD2);
  }
}

.legend-text {
  font-size: 0.7rem;
  color: var(--text-color);
  font-weight: 500;
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .radar-map {
    height: 200px;
  }
  
  .radar-legend {
    bottom: 8px;
    right: 8px;
    padding: 6px 10px;
    gap: 8px;
  }
  
  .legend-text {
    font-size: 0.65rem;
  }
}
</style>
