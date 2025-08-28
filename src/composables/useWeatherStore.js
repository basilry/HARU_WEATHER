import { ref, reactive } from 'vue'
import { weatherService } from '@services/weatherService.js'
import { locationService } from '@services/locationService.js'
import { storageService } from '@services/storageService.js'

// 전역 상태 관리를 위한 컴포저블
export function useWeatherStore() {
  // 반응형 상태
  const currentWeather = ref(null)
  const forecast = ref(null)
  const searchQuery = ref('')
  const searchSuggestions = ref([])
  const error = ref('')
  const favorites = ref([])
  
  // 로딩 상태
  const isLoading = ref(false)
  const isSearching = ref(false)
  const isGettingLocation = ref(false)

  // 즐겨찾기 불러오기
  const loadFavorites = () => {
    favorites.value = storageService.getFavorites()
  }

  // 현재 위치 가져오기
  const getCurrentLocation = async () => {
    try {
      isGettingLocation.value = true
      error.value = ''
      
      console.log('위치 정보 가져오기 시작...')
      const position = await locationService.getCurrentPosition()
      console.log('위치 정보 성공:', position.coords)
      
      console.log('날씨 정보 로드 시작...')
      await loadWeatherByCoords(position.coords.latitude, position.coords.longitude)
      console.log('날씨 정보 로드 완료')
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
      
      console.log('검색어:', searchQuery.value.trim())
      const cities = await weatherService.searchCities(searchQuery.value.trim())
      console.log('검색 결과:', cities)
      
      if (cities.length === 0) {
        throw new Error('해당 도시를 찾을 수 없습니다.')
      }
      
      const firstCity = cities[0]
      console.log('선택된 도시:', firstCity)
      const weatherData = await weatherService.getCurrentWeather(firstCity.lat, firstCity.lon)
      const forecastData = await weatherService.getForecast(firstCity.lat, firstCity.lon)
      
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
  const selectSuggestion = async (suggestion) => {
    try {
      isSearching.value = true
      error.value = ''
      
      const weatherData = await weatherService.getCurrentWeather(suggestion.lat, suggestion.lon)
      const forecastData = await weatherService.getForecast(suggestion.lat, suggestion.lon)
      
      currentWeather.value = weatherData
      forecast.value = forecastData
      searchQuery.value = `${suggestion.name}, ${suggestion.country}`
      searchSuggestions.value = []
    } catch (err) {
      error.value = err.message
      console.error('자동완성 선택 실패:', err)
    } finally {
      isSearching.value = false
    }
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
    favorites,
    isLoading,
    isSearching,
    isGettingLocation,
    
    // 메서드
    loadFavorites,
    getCurrentLocation,
    loadWeatherByCoords,
    searchWeather,
    onSearchInput,
    selectSuggestion,
    addToFavorites,
    removeFromFavorites,
    loadFavoriteWeather
  }
}
