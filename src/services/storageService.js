/**
 * 로컬 스토리지 서비스 - 즐겨찾기, 설정 등 관리
 */

const STORAGE_KEYS = {
  FAVORITES: 'weather_favorites',
  DARK_MODE: 'weather_dark_mode',
  LAST_LOCATION: 'weather_last_location'
}

export const storageService = {
  /**
   * 즐겨찾기 목록 가져오기
   */
  getFavorites() {
    try {
      const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES)
      return favorites ? JSON.parse(favorites) : []
    } catch (error) {
      console.error('즐겨찾기 데이터 로드 실패:', error)
      return []
    }
  },

  /**
   * 즐겨찾기 목록 저장
   */
  saveFavorites(favorites) {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
    } catch (error) {
      console.error('즐겨찾기 데이터 저장 실패:', error)
    }
  },

  /**
   * 즐겨찾기에 추가
   */
  addFavorite(favorite) {
    const favorites = this.getFavorites()
    
    // 중복 체크
    if (!favorites.some(f => f.id === favorite.id)) {
      favorites.unshift(favorite)
      this.saveFavorites(favorites)
      return true
    }
    return false
  },

  /**
   * 즐겨찾기에서 제거
   */
  removeFavorite(favoriteId) {
    const favorites = this.getFavorites()
    const filtered = favorites.filter(f => f.id !== favoriteId)
    this.saveFavorites(filtered)
    return filtered.length !== favorites.length
  },

  /**
   * 다크모드 설정 가져오기
   */
  getDarkMode() {
    try {
      const darkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE)
      if (darkMode === null) {
        // 시스템 설정에 따라 기본값 결정
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return darkMode === 'true'
    } catch (error) {
      console.error('다크모드 설정 로드 실패:', error)
      return false
    }
  },

  /**
   * 다크모드 설정 저장
   */
  saveDarkMode(isDarkMode) {
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(isDarkMode))
    } catch (error) {
      console.error('다크모드 설정 저장 실패:', error)
    }
  },

  /**
   * 마지막 위치 정보 가져오기
   */
  getLastLocation() {
    try {
      const location = localStorage.getItem(STORAGE_KEYS.LAST_LOCATION)
      return location ? JSON.parse(location) : null
    } catch (error) {
      console.error('마지막 위치 정보 로드 실패:', error)
      return null
    }
  },

  /**
   * 마지막 위치 정보 저장
   */
  saveLastLocation(location) {
    try {
      const locationData = {
        ...location,
        timestamp: Date.now()
      }
      localStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(locationData))
    } catch (error) {
      console.error('마지막 위치 정보 저장 실패:', error)
    }
  },

  /**
   * 모든 저장된 데이터 삭제
   */
  clearAll() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error('데이터 삭제 실패:', error)
    }
  },

  /**
   * 스토리지 사용량 체크
   */
  getStorageUsage() {
    try {
      let totalSize = 0
      const usage = {}
      
      Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
        const value = localStorage.getItem(key)
        const size = value ? new Blob([value]).size : 0
        usage[name] = {
          key,
          size,
          sizeFormatted: this.formatBytes(size)
        }
        totalSize += size
      })
      
      return {
        total: totalSize,
        totalFormatted: this.formatBytes(totalSize),
        items: usage
      }
    } catch (error) {
      console.error('스토리지 사용량 확인 실패:', error)
      return null
    }
  },

  /**
   * 바이트를 읽기 쉬운 형태로 변환
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  /**
   * 스토리지 지원 여부 확인
   */
  isStorageAvailable() {
    try {
      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (error) {
      console.warn('로컬 스토리지를 사용할 수 없습니다:', error)
      return false
    }
  }
}
