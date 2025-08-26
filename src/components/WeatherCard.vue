<template>
  <div class="weather-card card">
    <div class="weather-header">
      <div class="location-info">
        <h2 class="city-name">{{ weather.name }}</h2>
        <p class="country">{{ weather.sys.country }}</p>
        <p class="date-time">{{ formattedDateTime }}</p>
      </div>
      <button 
        @click="$emit('add-to-favorites', weather)" 
        class="btn btn-secondary favorite-btn"
        title="즐겨찾기 추가"
      >
        ⭐
      </button>
    </div>

    <div class="weather-main">
      <div class="temperature-section">
        <div class="current-temp">{{ Math.round(weather.main.temp) }}°C</div>
        <div class="weather-icon">
          <img 
            :src="getWeatherIconUrl(weather.weather[0].icon)" 
            :alt="weather.weather[0].description"
            class="weather-icon-img"
          />
        </div>
      </div>
      
      <div class="weather-description">
        <p class="description">{{ getKoreanDescription(weather.weather[0].main) }}</p>
        <p class="feels-like">체감온도 {{ Math.round(weather.main.feels_like) }}°C</p>
      </div>
    </div>

    <!-- 지도 섹션 - 전체 너비 사용 -->
    <div class="map-section-full">
      <WeatherMap
        :latitude="weather.coord.lat"
        :longitude="weather.coord.lon"
        :city-name="weather.name"
        :weather="weather"
      />
    </div>

    <div class="weather-details">
      <div class="detail-grid">
        <div class="detail-item">
          <div class="detail-icon">💧</div>
          <div class="detail-content">
            <span class="detail-label">습도</span>
            <span class="detail-value">{{ weather.main.humidity }}%</span>
          </div>
        </div>
        
        <div class="detail-item">
          <div class="detail-icon">👁</div>
          <div class="detail-content">
            <span class="detail-label">가시거리</span>
            <span class="detail-value">{{ (weather.visibility / 1000).toFixed(1) }}km</span>
          </div>
        </div>
        
        <div class="detail-item">
          <div class="detail-icon">🌪</div>
          <div class="detail-content">
            <span class="detail-label">바람</span>
            <span class="detail-value">{{ weather.wind.speed.toFixed(1) }}m/s</span>
          </div>
        </div>
        
        <div class="detail-item">
          <div class="detail-icon">🌡</div>
          <div class="detail-content">
            <span class="detail-label">기압</span>
            <span class="detail-value">{{ weather.main.pressure }}hPa</span>
          </div>
        </div>
        
        <div class="detail-item">
          <div class="detail-icon">🌅</div>
          <div class="detail-content">
            <span class="detail-label">일출</span>
            <span class="detail-value">{{ formatTime(weather.sys.sunrise) }}</span>
          </div>
        </div>
        
        <div class="detail-item">
          <div class="detail-icon">🌇</div>
          <div class="detail-content">
            <span class="detail-label">일몰</span>
            <span class="detail-value">{{ formatTime(weather.sys.sunset) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 온도 범위 표시 -->
    <div class="temp-range">
      <div class="temp-bar">
        <div class="temp-indicator" :style="tempIndicatorStyle"></div>
      </div>
      <div class="temp-labels">
        <span class="min-temp">최저 {{ Math.round(weather.main.temp_min) }}°</span>
        <span class="max-temp">최고 {{ Math.round(weather.main.temp_max) }}°</span>
      </div>
    </div>

    <!-- 날씨 아이콘 가이드 -->
    <div class="weather-icon-guide">
      <h4 class="guide-title">📍 날씨 아이콘 가이드</h4>
      <div class="icon-guide-grid">
        <div class="icon-guide-item">
          <img src="https://openweathermap.org/img/wn/01d.png" alt="맑음" class="guide-icon" />
          <span class="guide-text">맑음</span>
        </div>
        <div class="icon-guide-item">
          <img src="https://openweathermap.org/img/wn/02d.png" alt="구름 조금" class="guide-icon" />
          <span class="guide-text">구름 조금</span>
        </div>
        <div class="icon-guide-item">
          <img src="https://openweathermap.org/img/wn/03d.png" alt="구름 많음" class="guide-icon" />
          <span class="guide-text">구름 많음</span>
        </div>
        <div class="icon-guide-item">
          <img src="https://openweathermap.org/img/wn/04d.png" alt="흐림" class="guide-icon" />
          <span class="guide-text">흐림</span>
        </div>
        <div class="icon-guide-item">
          <img src="https://openweathermap.org/img/wn/09d.png" alt="소나기" class="guide-icon" />
          <span class="guide-text">소나기</span>
        </div>
        <div class="icon-guide-item">
          <img src="https://openweathermap.org/img/wn/10d.png" alt="비" class="guide-icon" />
          <span class="guide-text">비</span>
        </div>
        <div class="icon-guide-item">
          <img src="https://openweathermap.org/img/wn/11d.png" alt="뇌우" class="guide-icon" />
          <span class="guide-text">뇌우</span>
        </div>
        <div class="icon-guide-item">
          <img src="https://openweathermap.org/img/wn/13d.png" alt="눈" class="guide-icon" />
          <span class="guide-text">눈</span>
        </div>
        <div class="icon-guide-item">
          <img src="https://openweathermap.org/img/wn/50d.png" alt="안개" class="guide-icon" />
          <span class="guide-text">안개</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import WeatherMap from '@components/WeatherMap.vue'

export default {
  name: 'WeatherCard',
  components: {
    WeatherMap
  },
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  emits: ['add-to-favorites'],
  setup(props) {
    const formattedDateTime = computed(() => {
      const now = new Date()
      return now.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'long'
      })
    })

    const getWeatherIconUrl = (icon) => {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }

    const getKoreanDescription = (main) => {
      const descriptions = {
        'Clear': '맑음',
        'Clouds': '흐림',
        'Rain': '비',
        'Drizzle': '이슬비',
        'Thunderstorm': '뇌우',
        'Snow': '눈',
        'Mist': '안개',
        'Fog': '짙은 안개',
        'Haze': '실안개',
        'Dust': '먼지',
        'Sand': '모래바람',
        'Ash': '화산재',
        'Squall': '돌풍',
        'Tornado': '토네이도'
      }
      return descriptions[main] || main
    }

    const formatTime = (timestamp) => {
      const date = new Date(timestamp * 1000)
      return date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const tempIndicatorStyle = computed(() => {
      const { temp, temp_min, temp_max } = props.weather.main
      const range = temp_max - temp_min
      const position = range > 0 ? ((temp - temp_min) / range) * 100 : 50
      return {
        left: `${Math.max(0, Math.min(100, position))}%`
      }
    })

    return {
      formattedDateTime,
      getWeatherIconUrl,
      getKoreanDescription,
      formatTime,
      tempIndicatorStyle
    }
  }
}
</script>

<style scoped>
.weather-card {
  max-width: 600px;
  margin: 0 auto;
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.location-info {
  flex: 1;
}

.city-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: var(--text-color);
}

.country {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0 0 8px 0;
}

.date-time {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
}

.favorite-btn {
  font-size: 1.2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.temperature-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.current-temp {
  font-size: 4rem;
  font-weight: 300;
  color: var(--primary-color);
  line-height: 1;
}

.weather-icon-img {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.weather-description {
  text-align: right;
}

.description {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: var(--text-color);
}

.feels-like {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
}

.weather-details {
  margin-bottom: 24px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--background-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.detail-icon {
  font-size: 1.5rem;
  width: 32px;
  text-align: center;
}

.detail-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.detail-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
}

.temp-range {
  margin-top: 24px;
}

.temp-bar {
  position: relative;
  height: 8px;
  background: linear-gradient(to right, #3b82f6, #ef4444);
  border-radius: 4px;
  margin-bottom: 8px;
}

.temp-indicator {
  position: absolute;
  top: -4px;
  width: 16px;
  height: 16px;
  background: white;
  border: 3px solid var(--primary-color);
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.temp-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .city-name {
    font-size: 1.5rem;
  }
  
  .current-temp {
    font-size: 3rem;
  }
  
  .weather-icon-img {
    width: 60px;
    height: 60px;
  }
  
  .weather-main {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .weather-description {
    text-align: center;
  }
  
  .detail-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .detail-item {
    padding: 8px;
  }
}
</style>
