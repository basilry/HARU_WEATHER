<template>
  <section class="forecast-section">
    <h2 class="section-title">📅 5일 날씨 예보</h2>
    
    <div class="forecast-container">
      <div 
        v-for="day in forecastDays" 
        :key="day.date"
        class="forecast-card card"
      >
        <div class="forecast-date">
          <div class="day-name">{{ day.dayName }}</div>
          <div class="date">{{ day.dateStr }}</div>
        </div>
        
        <div class="forecast-weather">
          <div class="weather-icon-desc">
            <img 
              :src="getWeatherIconUrl(day.weather.icon)" 
              :alt="day.weather.description"
              class="forecast-icon"
            />
            <div class="weather-desc">{{ getKoreanDescription(day.weather.main) }}</div>
          </div>
        </div>
        
        <div class="forecast-temp">
          <div class="temp-range">
            <span class="max-temp">{{ day.tempMax }}°</span>
            <span class="temp-separator">/</span>
            <span class="min-temp">{{ day.tempMin }}°</span>
          </div>
        </div>
        
        <div class="forecast-details">
          <div class="detail-row">
            <span class="detail-icon">💧</span>
            <span class="detail-text">{{ day.humidity }}%</span>
            <span class="detail-icon">🌪</span>
            <span class="detail-text">{{ day.windSpeed }}m/s</span>
            <span class="detail-icon">☔</span>
            <span class="detail-text">{{ day.precipitation }}%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ForecastSection',
  props: {
    forecast: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const forecastDays = computed(() => {
      if (!props.forecast?.list) return []
      
      // 5일 예보 데이터를 일별로 그룹화
      const dailyData = {}
      
      props.forecast.list.forEach(item => {
        const date = new Date(item.dt * 1000)
        const dateKey = date.toDateString()
        
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = {
            date: date,
            temps: [],
            humidity: [],
            windSpeed: [],
            precipitation: [],
            weather: item.weather[0]
          }
        }
        
        dailyData[dateKey].temps.push(item.main.temp)
        dailyData[dateKey].humidity.push(item.main.humidity)
        dailyData[dateKey].windSpeed.push(item.wind?.speed || 0)
        dailyData[dateKey].precipitation.push(item.pop ? item.pop * 100 : 0)
      })
      
      // 일별 데이터를 정리하여 반환
      return Object.values(dailyData)
        .slice(0, 5) // 5일만
        .map(day => ({
          date: day.date,
          dayName: day.date.toLocaleDateString('ko-KR', { weekday: 'short' }),
          dateStr: day.date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
          tempMax: Math.round(Math.max(...day.temps)),
          tempMin: Math.round(Math.min(...day.temps)),
          humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
          windSpeed: (day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length).toFixed(1),
          precipitation: Math.round(day.precipitation.reduce((a, b) => a + b, 0) / day.precipitation.length),
          weather: day.weather
        }))
    })

    const getWeatherIconUrl = (icon) => {
      return `https://openweathermap.org/img/wn/${icon}.png`
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

    return {
      forecastDays,
      getWeatherIconUrl,
      getKoreanDescription
    }
  }
}
</script>

<style scoped>
.forecast-section {
  margin-top: 48px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--text-color);
}

.forecast-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.forecast-card {
  text-align: center;
  padding: 20px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.forecast-date {
  margin-bottom: 16px;
}

.day-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
}

.date {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.forecast-weather {
  margin-bottom: 16px;
}

.forecast-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
}

.weather-info {
  margin-bottom: 8px;
}

.weather-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.temp-range {
  font-size: 1.2rem;
  font-weight: 600;
}

.max-temp {
  color: var(--text-color);
}

.temp-separator {
  color: var(--text-secondary);
  margin: 0 4px;
}

.min-temp {
  color: var(--text-secondary);
}

.forecast-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.85rem;
}

.detail-icon {
  font-size: 1rem;
}

.detail-text {
  color: var(--text-secondary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .forecast-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .forecast-card {
    padding: 16px;
    min-height: 180px;
  }
  
  .forecast-icon {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  .forecast-container {
    grid-template-columns: 1fr;
  }
}
</style>
