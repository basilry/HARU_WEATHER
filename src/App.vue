<template>
  <div id="app" :data-theme="isDarkMode ? 'dark' : 'light'">
    <div class="container">
      <!-- 헤더 -->
      <header class="header">
        <h1 class="app-title">🌤️ HARU WEATHER</h1>
        <div class="header-controls">
          <button 
            @click="toggleDarkMode" 
            class="btn btn-secondary theme-toggle"
            :title="isDarkMode ? '라이트 모드' : '다크 모드'"
          >
            {{ isDarkMode ? '☀️' : '🌙' }}
          </button>
        </div>
      </header>

      <!-- 검색 섹션 -->
      <section class="search-section">
        <div class="search-container">
          <input
            v-model="searchQuery"
            @keyup.enter="searchWeather"
            @input="onSearchInput"
            class="input search-input"
            placeholder="도시 이름을 입력하세요..."
            :disabled="isLoading"
          />
          <button 
            @click="searchWeather" 
            class="btn search-btn"
            :disabled="isLoading || !searchQuery.trim()"
          >
            <span v-if="isSearching" class="loading"></span>
            <span v-else>🔍</span>
          </button>
          <button 
            @click="getCurrentLocation" 
            class="btn btn-secondary location-btn"
            :disabled="isLoading"
            title="현재 위치"
          >
            <span v-if="isGettingLocation" class="loading"></span>
            <span v-else>📍</span>
          </button>
        </div>
        
        <!-- 검색 자동완성 -->
        <div v-if="searchSuggestions.length > 0" class="suggestions">
          <div 
            v-for="suggestion in searchSuggestions" 
            :key="suggestion.id"
            @click="selectSuggestion(suggestion)"
            class="suggestion-item"
          >
            {{ suggestion.name }}, {{ suggestion.country }}
          </div>
        </div>
      </section>

      <!-- 에러 메시지 -->
      <transition name="fade">
        <div v-if="error" class="error-message">
          ⚠️ {{ error }}
          <button @click="getCurrentLocation" class="retry-btn">다시 시도</button>
        </div>
      </transition>

      <!-- 레이어 선택기 -->
      <div v-if="currentWeather && !isLoading" class="layer-selector">
        <h3 class="layer-title">날씨 레이어 선택</h3>
        <div class="layer-options">
          <button
            v-for="layer in availableLayers"
            :key="layer.value"
            @click="selectedLayer = layer.value"
            class="layer-btn"
            :class="{ active: selectedLayer === layer.value }"
          >
            <span class="layer-icon">{{ layer.icon }}</span>
            <span class="layer-name">{{ layer.name }}</span>
          </button>
        </div>
      </div>

      <!-- 메인 날씨 카드와 레이더 -->
      <transition name="slide-up">
        <div v-if="currentWeather" class="main-weather-section">
          <div class="weather-main">
            <WeatherCard 
              :weather="currentWeather"
              @add-to-favorites="addToFavorites"
            />
          </div>
          <div class="weather-sidebar">
            <WeatherRadar
              :latitude="currentWeather.coord.lat"
              :longitude="currentWeather.coord.lon"
              :cityName="currentWeather.name"
              :layerType="selectedLayer"
            />
          </div>
        </div>
      </transition>

      <!-- 로딩 상태 -->
      <div v-if="isLoading && !currentWeather" class="loading-container">
        <div class="loading-large"></div>
        <p>날씨 정보를 불러오는 중...</p>
        <p class="loading-debug">현재 상태: isLoading={{ isLoading }}, currentWeather={{ currentWeather ? '있음' : '없음' }}</p>
      </div>

      <!-- 즐겨찾기 섹션 -->
      <section v-if="favorites.length > 0" class="favorites-section">
        <h2 class="section-title">⭐ 즐겨찾기</h2>
        <div class="favorites-grid">
          <FavoriteCard
            v-for="favorite in favorites"
            :key="favorite.id"
            :favorite="favorite"
            @click="loadFavoriteWeather(favorite)"
            @remove="removeFromFavorites(favorite.id)"
          />
        </div>
      </section>

      <!-- 5일 예보 -->
      <transition name="slide-up">
        <ForecastSection 
          v-if="forecast && !isLoading"
          :forecast="forecast"
        />
      </transition>
    </div>
    
    <!-- 스크롤 to top 버튼 -->
    <ScrollToTop :isDarkMode="isDarkMode" />
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import WeatherCard from '@components/WeatherCard.vue'
import FavoriteCard from '@components/FavoriteCard.vue'
import ForecastSection from '@components/ForecastSection.vue'
import ScrollToTop from '@components/ScrollToTop.vue'
import WeatherRadar from '@components/WeatherRadar.vue'
import { weatherService } from '@services/weatherService.js'
import { locationService } from '@services/locationService.js'
import { storageService } from '@services/storageService.js'

export default {
  name: 'App',
  components: {
    WeatherCard,
    FavoriteCard,
    ForecastSection,
    ScrollToTop,
    WeatherRadar
  },
  setup() {
    // 반응형 상태
    const currentWeather = ref(null)
    const forecast = ref(null)
    const searchQuery = ref('')
    const searchSuggestions = ref([])
    const error = ref('')
    const isDarkMode = ref(false)
    const favorites = ref([])
    const selectedLayer = ref('clouds_new')
    
    // 사용 가능한 레이어 목록
    const availableLayers = [
      { value: 'clouds_new', name: '구름', icon: '☁️' },
      { value: 'precipitation_new', name: '강수', icon: '🌧️' },
      { value: 'pressure_new', name: '기압', icon: '🌪️' },
      { value: 'wind_new', name: '풍속', icon: '💨' },
      { value: 'temp_new', name: '온도', icon: '🌡️' }
    ]
    
    // 로딩 상태
    const isLoading = ref(false)
    const isSearching = ref(false)
    const isGettingLocation = ref(false)

    // 컴포넌트 마운트 시 실행
    onMounted(async () => {
      // 다크모드 설정 불러오기
      isDarkMode.value = storageService.getDarkMode()
      
      // body에 초기 테마 설정
      document.body.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
      
      // 즐겨찾기 불러오기
      favorites.value = storageService.getFavorites()
      
      // 디버깅을 위한 상태 로깅
      console.log('초기 상태:', {
        currentWeather: currentWeather.value,
        isLoading: isLoading.value,
        error: error.value
      })
      
      // 자동으로 현재 위치 날씨 가져오기
      await getCurrentLocation()
    })

    // 현재 위치 가져오기
    const getCurrentLocation = async () => {
      try {
        isGettingLocation.value = true
        error.value = ''
        
        console.log('위치 정보 가져오기 시작...')
        const position = await locationService.getCurrentPosition()
        console.log('위치 정보 성공:', position.coords)
        
        await loadWeatherByCoords(position.coords.latitude, position.coords.longitude)
      } catch (err) {
        error.value = err.message
        console.error('위치 정보 가져오기 실패:', err)
      } finally {
        isGettingLocation.value = false
      }
    }

    // 좌표로 날씨 정보 가져오기
    const loadWeatherByCoords = async (lat, lon) => {
      try {
        isLoading.value = true
        error.value = ''
        
        console.log('날씨 정보 가져오기 시작...', { lat, lon })
        
        const [weatherData, forecastData] = await Promise.all([
          weatherService.getCurrentWeather(lat, lon),
          weatherService.getForecast(lat, lon)
        ])
        
        console.log('날씨 데이터 성공:', { weatherData, forecastData })
        
        currentWeather.value = weatherData
        forecast.value = forecastData
        
        console.log('상태 업데이트 후:', {
          currentWeather: currentWeather.value,
          isLoading: isLoading.value
        })
      } catch (err) {
        error.value = err.message
        console.error('날씨 정보 로드 실패:', err)
      } finally {
        isLoading.value = false
      }
    }

    // 도시 검색
    const searchWeather = async () => {
      if (!searchQuery.value.trim()) return
      
      try {
        isSearching.value = true
        error.value = ''
        
        const weatherData = await weatherService.getWeatherByCity(searchQuery.value.trim())
        const forecastData = await weatherService.getForecastByCity(searchQuery.value.trim())
        
        currentWeather.value = weatherData
        forecast.value = forecastData
        searchSuggestions.value = []
      } catch (err) {
        error.value = err.message
        console.error('도시 검색 실패:', err)
      } finally {
        isSearching.value = false
      }
    }

    // 검색 입력 시 자동완성
    const onSearchInput = async () => {
      if (searchQuery.value.length < 2) {
        searchSuggestions.value = []
        return
      }
      
      try {
        const suggestions = await weatherService.searchCities(searchQuery.value)
        searchSuggestions.value = suggestions.slice(0, 5) // 최대 5개
      } catch (err) {
        console.error('도시 검색 자동완성 실패:', err)
      }
    }

    // 자동완성 선택
    const selectSuggestion = (suggestion) => {
      searchQuery.value = `${suggestion.name}, ${suggestion.country}`
      searchSuggestions.value = []
      searchWeather()
    }

    // 다크모드 토글
    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      storageService.saveDarkMode(isDarkMode.value)
      // body에 data-theme 속성 설정
      document.body.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
    }

    // 즐겨찾기 추가
    const addToFavorites = (weather) => {
      const favorite = {
        id: `${weather.coord.lat}_${weather.coord.lon}`,
        name: weather.name,
        country: weather.sys.country,
        lat: weather.coord.lat,
        lon: weather.coord.lon,
        temp: Math.round(weather.main.temp),
        weather: weather.weather[0],
        addedAt: new Date().toISOString()
      }
      
      // 중복 체크
      if (!favorites.value.some(f => f.id === favorite.id)) {
        favorites.value.unshift(favorite)
        storageService.saveFavorites(favorites.value)
      }
    }

    // 즐겨찾기 제거
    const removeFromFavorites = (favoriteId) => {
      favorites.value = favorites.value.filter(f => f.id !== favoriteId)
      storageService.saveFavorites(favorites.value)
    }

    // 즐겨찾기 클릭 시 날씨 로드
    const loadFavoriteWeather = (favorite) => {
      loadWeatherByCoords(favorite.lat, favorite.lon)
    }

    return {
      // 상태
      currentWeather,
      forecast,
      searchQuery,
      searchSuggestions,
      error,
      isDarkMode,
      favorites,
      isLoading,
      isSearching,
      isGettingLocation,
      
      // 메서드
      getCurrentLocation,
      searchWeather,
      onSearchInput,
      selectSuggestion,
      toggleDarkMode,
      addToFavorites,
      removeFromFavorites,
      loadFavoriteWeather
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'sass:color';

.header {
  @include mix.flex-between;
  margin-bottom: vars.$spacing-8;
  padding-bottom: vars.$spacing-4;
  border-bottom: 2px solid var(--border-color);
}

.app-title {
  font-size: vars.$font-size-4xl;
  font-weight: vars.$font-weight-bold;
  color: var(--title-color);
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @include mix.gradient-text(linear-gradient(135deg, var(--primary-color), var(--accent-color)));
}

.header-controls {
  display: flex;
  gap: vars.$spacing-3;
}

.theme-toggle {
  width: 48px;
  height: 48px;
  border-radius: vars.$radius-full;
  font-size: vars.$font-size-xl;
  @include mix.flex-center;
  padding: 0;
}

.search-section {
  position: relative;
  margin-bottom: vars.$spacing-8;
}

.search-container {
  display: flex;
  gap: vars.$spacing-3;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
}

.search-btn, .location-btn {
  width: 48px;
  height: 48px;
  @include mix.flex-center;
  font-size: vars.$font-size-lg;
  padding: 0;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: vars.$radius-md;
  box-shadow: var(--shadow);
  z-index: vars.$z-index-dropdown;
  margin-top: vars.$spacing-1;
}

.suggestion-item {
  padding: vars.$spacing-3 vars.$spacing-4;
  cursor: pointer;
  transition: var(--transition);
  border-bottom: 1px solid var(--border-color);
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background: var(--border-color);
}

.error-message {
  background: rgba(vars.$error, 0.1);
  color: vars.$error;
  padding: vars.$spacing-4;
  border-radius: vars.$radius-md;
  margin-bottom: vars.$spacing-6;
  text-align: center;
  border: 1px solid rgba(vars.$error, 0.2);
}

[data-theme="dark"] .error-message {
  background: rgba(vars.$error, 0.2);
  color: color.adjust(vars.$error, $lightness: 20%);
  border-color: rgba(vars.$error, 0.3);
}

.loading-container {
  text-align: center;
  padding: vars.$spacing-12 vars.$spacing-6;
}

.loading-large {
  @include mix.loading-spinner(48px, 4px);
  margin: 0 auto vars.$spacing-4;
}

.favorites-section {
  margin-top: vars.$spacing-12;
}

.section-title {
  font-size: vars.$font-size-2xl;
  font-weight: vars.$font-weight-semibold;
  margin-bottom: vars.$spacing-6;
  color: var(--text-color);
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: vars.$spacing-4;
}

@include mix.mobile {
  .app-title {
    font-size: vars.$font-size-3xl;
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .search-btn, .location-btn {
    width: 100%;
    height: 48px;
  }
  
  .favorites-grid {
    grid-template-columns: 1fr;
  }
}
</style>
