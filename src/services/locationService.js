/**
 * 위치 서비스 - Geolocation API와 IP 기반 위치 파악
 */

export const locationService = {
  /**
   * 브라우저의 Geolocation API를 사용하여 현재 위치 가져오기
   */
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('이 브라우저는 위치 서비스를 지원하지 않습니다.'))
        return
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5분 캐시
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position)
        },
        (error) => {
          let errorMessage = '위치 정보를 가져올 수 없습니다.'
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = '위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = '위치 정보를 사용할 수 없습니다.'
              break
            case error.TIMEOUT:
              errorMessage = '위치 정보 요청이 시간 초과되었습니다.'
              break
          }
          
          reject(new Error(errorMessage))
        },
        options
      )
    })
  },

  /**
   * IP 기반으로 대략적인 위치 정보 가져오기 (fallback)
   */
  async getLocationByIP() {
    try {
      const response = await fetch('https://ipapi.co/json/')
      if (!response.ok) {
        throw new Error('IP 기반 위치 정보를 가져올 수 없습니다.')
      }
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.reason || 'IP 기반 위치 정보를 가져올 수 없습니다.')
      }
      
      return {
        coords: {
          latitude: data.latitude,
          longitude: data.longitude
        },
        city: data.city,
        country: data.country_name,
        source: 'ip'
      }
    } catch (error) {
      console.error('IP 기반 위치 조회 실패:', error)
      throw new Error('위치 정보를 가져올 수 없습니다. 도시 이름으로 검색해보세요.')
    }
  },

  /**
   * 위치 권한 상태 확인
   */
  async checkPermission() {
    if (!navigator.permissions) {
      return 'unsupported'
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' })
      return permission.state // 'granted', 'denied', 'prompt'
    } catch (error) {
      console.error('위치 권한 상태 확인 실패:', error)
      return 'unknown'
    }
  },

  /**
   * 위치 정보 가져오기 (GPS 우선, 실패 시 IP 기반)
   */
  async getLocation() {
    try {
      // 먼저 GPS 위치 시도
      const position = await this.getCurrentPosition()
      return {
        coords: position.coords,
        source: 'gps'
      }
    } catch (gpsError) {
      console.warn('GPS 위치 조회 실패, IP 기반으로 시도:', gpsError.message)
      
      try {
        // GPS 실패 시 IP 기반 위치 시도
        return await this.getLocationByIP()
      } catch (ipError) {
        console.error('IP 기반 위치 조회도 실패:', ipError.message)
        throw new Error('위치 정보를 가져올 수 없습니다. 직접 도시를 검색해주세요.')
      }
    }
  }
}
