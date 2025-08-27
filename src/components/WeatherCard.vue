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

    <div class="weather-content">
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

export default {
  name: 'WeatherCard',
  components: {
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

<style lang="scss" scoped>
  @use '../styles/components/weatherCard.module.scss' as weatherCard;
</style>
