<template>
  <div class="favorite-card card" @click="$emit('click', favorite)">
    <div class="favorite-header">
      <div class="favorite-location">
        <h3 class="favorite-name">{{ favorite.name }}</h3>
        <p class="favorite-country">{{ favorite.country }}</p>
      </div>
      <button 
        @click.stop="$emit('remove', favorite.id)" 
        class="remove-btn"
        title="즐겨찾기 제거"
      >
        ✕
      </button>
    </div>

    <div class="favorite-weather">
      <div class="favorite-temp">{{ favorite.temp }}°C</div>
      <div class="favorite-icon">
        <img 
          :src="getWeatherIconUrl(favorite.weather.icon)" 
          :alt="favorite.weather.description"
          class="favorite-weather-icon"
        />
      </div>
    </div>

    <div class="favorite-description">
      {{ getKoreanDescription(favorite.weather.main) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoriteCard',
  props: {
    favorite: {
      type: Object,
      required: true
    }
  },
  emits: ['click', 'remove'],
  setup() {
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
      getWeatherIconUrl,
      getKoreanDescription
    }
  }
}
</script>

<style lang="scss" scoped>
.favorite-card {
  cursor: pointer;
  transition: var(--transition);
  position: relative;
}

.favorite-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px -8px rgba(0, 0, 0, 0.15);
}

.favorite-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.favorite-location {
  flex: 1;
}

.favorite-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text-color);
}

.favorite-country {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: var(--transition);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.favorite-weather {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.favorite-temp {
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-color);
}

.favorite-weather-icon {
  width: 48px;
  height: 48px;
}

.favorite-description {
  font-size: 1rem;
  color: var(--text-secondary);
  text-align: center;
}

@media (max-width: 768px) {
  .favorite-name {
    font-size: 1.1rem;
  }
  
  .favorite-temp {
    font-size: 1.8rem;
  }
  
  .favorite-weather-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
