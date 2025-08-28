<template>
  <div class="home-page">
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
          <span class="city-name">{{ suggestion.name }}</span>
          <span class="city-detail">{{ suggestion.state ? `${suggestion.state}, ` : '' }}{{ suggestion.country }}</span>
        </div>
      </div>
    </section>

    <!-- 즐겨찾기 섹션 (작은 사이즈) -->
    <section v-if="favorites.length > 0" class="favorites-section-compact">
      <div class="favorites-compact-grid">
        <div
          v-for="favorite in favorites"
          :key="favorite.id"
          @click="loadFavoriteWeather(favorite)"
          class="favorite-compact-item"
          :title="`${favorite.name}, ${favorite.country}`"
        >
          <div class="favorite-compact-info">
            <span class="favorite-compact-name">{{ favorite.name }}</span>
            <span class="favorite-compact-temp">{{ favorite.temp }}°</span>
          </div>
          <button 
            @click.stop="removeFromFavorites(favorite.id)"
            class="favorite-compact-remove"
            title="즐겨찾기 제거"
          >
            ×
          </button>
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

    <!-- 메인 날씨 카드와 레이더 -->
    <transition name="slide-up">
      <div v-if="currentWeather" class="weather-layout">
        <div class="weather-card-container">
          <WeatherCard 
            :weather="currentWeather"
            @add-to-favorites="addToFavorites"
          />
        </div>
        <div class="weather-radar-container">
          <WeatherRadar
            :latitude="currentWeather.coord.lat"
            :longitude="currentWeather.coord.lon"
            :cityName="currentWeather.name"
          />
        </div>
      </div>
    </transition>

    <!-- 로딩 상태 -->
    <div v-if="isLoading && !currentWeather" class="loading-container">
      <div class="loading-large"></div>
      <p>날씨 정보를 불러오는 중...</p>
    </div>

    <!-- 5일 예보 -->
    <transition name="slide-up">
      <ForecastSection 
        v-if="forecast && !isLoading"
        :forecast="forecast"
      />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useWeatherStore } from '../composables/useWeatherStore.js'
import WeatherCard from '@components/WeatherCard.vue'
import ForecastSection from '@components/ForecastSection.vue'
import WeatherRadar from '@components/WeatherRadar.vue'

export default {
  name: 'Home',
  components: {
    WeatherCard,
    ForecastSection,
    WeatherRadar
  },
  setup() {
    const {
      // 상태
      currentWeather,
      forecast,
      searchQuery,
      searchSuggestions,
      error,
      favorites,
      isLoading,
      isSearching,
      isGettingLocation,
      
      // 메서드
      getCurrentLocation,
      searchWeather,
      onSearchInput,
      selectSuggestion,
      addToFavorites,
      removeFromFavorites,
      loadFavoriteWeather
    } = useWeatherStore()

    // 컴포넌트 마운트 시 현재 위치 날씨 가져오기
    onMounted(async () => {
      console.log('Home 페이지 마운트, 현재 위치 날씨 가져오기 시작...')
      await getCurrentLocation()
    })

    return {
      // 상태
      currentWeather,
      forecast,
      searchQuery,
      searchSuggestions,
      error,
      favorites,
      isLoading,
      isSearching,
      isGettingLocation,
      
      // 메서드
      getCurrentLocation,
      searchWeather,
      onSearchInput,
      selectSuggestion,
      addToFavorites,
      removeFromFavorites,
      loadFavoriteWeather
    }
  }
}
</script>

<style lang="scss" scoped>
// 기존 App.vue의 스타일들을 그대로 사용
@use '../styles/components/app.module.scss' as app;

.home-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}


</style>
