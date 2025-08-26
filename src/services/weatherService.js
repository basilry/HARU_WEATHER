/**
 * 날씨 서비스 - OpenWeatherMap API 연동
 */

import axios from 'axios'

// OpenWeatherMap API 키 (실제 사용 시 환경변수로 관리)
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0'

// API 키가 설정되지 않은 경우 경고
if (!API_KEY) {
  console.warn(`
⚠️  OpenWeatherMap API 키가 설정되지 않았습니다!

다음 단계를 따라 설정해주세요:

1. https://openweathermap.org/api 에서 무료 계정 생성
2. API 키 발급 (무료 플랜: 1000 calls/day)
3. src/services/weatherService.js 파일의 API_KEY 상수에 발급받은 키 입력

현재는 모의 데이터로 동작합니다.
  `)
}

export const weatherService = {
  /**
   * 좌표로 현재 날씨 가져오기
   */
  async getCurrentWeather(lat, lon) {
    if (!API_KEY) {
      return this.getMockWeatherData()
    }

    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
          lang: 'kr'
        }
      })
      
      return response.data
    } catch (error) {
      console.error('현재 날씨 조회 실패:', error)
      throw new Error(this.getErrorMessage(error))
    }
  },

  /**
   * 도시명으로 현재 날씨 가져오기
   */
  async getWeatherByCity(cityName) {
    if (!API_KEY) {
      return this.getMockWeatherData(cityName)
    }

    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric',
          lang: 'kr'
        }
      })
      
      return response.data
    } catch (error) {
      console.error('도시별 날씨 조회 실패:', error)
      throw new Error(this.getErrorMessage(error))
    }
  },

  /**
   * 좌표로 5일 예보 가져오기
   */
  async getForecast(lat, lon) {
    if (!API_KEY) {
      return this.getMockForecastData()
    }

    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
          lang: 'kr'
        }
      })
      
      return response.data
    } catch (error) {
      console.error('날씨 예보 조회 실패:', error)
      throw new Error(this.getErrorMessage(error))
    }
  },

  /**
   * 도시명으로 5일 예보 가져오기
   */
  async getForecastByCity(cityName) {
    if (!API_KEY) {
      return this.getMockForecastData()
    }

    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric',
          lang: 'kr'
        }
      })
      
      return response.data
    } catch (error) {
      console.error('도시별 예보 조회 실패:', error)
      throw new Error(this.getErrorMessage(error))
    }
  },

  /**
   * 도시 검색 (자동완성용)
   */
  async searchCities(query) {
    if (!API_KEY) {
      return this.getMockCitySearch(query)
    }

    try {
      const response = await axios.get(`${GEO_URL}/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY
        }
      })
      
      return response.data.map(city => ({
        id: `${city.lat}_${city.lon}`,
        name: city.local_names?.ko || city.name,
        country: city.country,
        state: city.state,
        lat: city.lat,
        lon: city.lon
      }))
    } catch (error) {
      console.error('도시 검색 실패:', error)
      return []
    }
  },

  /**
   * 에러 메시지 처리
   */
  getErrorMessage(error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return 'API 키가 유효하지 않습니다.'
        case 404:
          return '해당 도시를 찾을 수 없습니다.'
        case 429:
          return 'API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요.'
        default:
          return error.response.data?.message || '날씨 정보를 가져올 수 없습니다.'
      }
    } else if (error.request) {
      return '네트워크 연결을 확인해주세요.'
    } else {
      return '알 수 없는 오류가 발생했습니다.'
    }
  },

  /**
   * 모의 날씨 데이터 (API 키 없을 때 사용)
   */
  getMockWeatherData(cityName = '서울') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          coord: { lon: 126.9778, lat: 37.5683 },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: '맑음',
              icon: '01d'
            }
          ],
          base: 'stations',
          main: {
            temp: 22.5,
            feels_like: 23.1,
            temp_min: 19.2,
            temp_max: 25.8,
            pressure: 1013,
            humidity: 65
          },
          visibility: 10000,
          wind: {
            speed: 2.3,
            deg: 180
          },
          clouds: {
            all: 20
          },
          dt: Math.floor(Date.now() / 1000),
          sys: {
            type: 1,
            id: 8105,
            country: 'KR',
            sunrise: Math.floor((Date.now() - 3600000) / 1000),
            sunset: Math.floor((Date.now() + 7200000) / 1000)
          },
          timezone: 32400,
          id: 1835848,
          name: cityName,
          cod: 200
        })
      }, 800)
    })
  },

  /**
   * 모의 예보 데이터
   */
  getMockForecastData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = []
        const now = new Date()
        
        for (let i = 0; i < 40; i++) {
          const date = new Date(now.getTime() + (i * 3 * 60 * 60 * 1000))
          list.push({
            dt: Math.floor(date.getTime() / 1000),
            main: {
              temp: 20 + Math.random() * 10,
              feels_like: 22 + Math.random() * 8,
              temp_min: 18 + Math.random() * 6,
              temp_max: 25 + Math.random() * 8,
              pressure: 1010 + Math.random() * 20,
              humidity: 50 + Math.random() * 40
            },
            weather: [
              {
                id: 800,
                main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
                description: '맑음',
                icon: ['01d', '02d', '10d'][Math.floor(Math.random() * 3)]
              }
            ],
            wind: {
              speed: Math.random() * 10,
              deg: Math.random() * 360
            },
            visibility: 10000,
            pop: Math.random() * 0.8,
            dt_txt: date.toISOString().replace('T', ' ').slice(0, 19)
          })
        }
        
        resolve({
          cod: '200',
          message: 0,
          cnt: 40,
          list,
          city: {
            id: 1835848,
            name: '서울',
            coord: { lat: 37.5683, lon: 126.9778 },
            country: 'KR',
            population: 10349312,
            timezone: 32400,
            sunrise: Math.floor((Date.now() - 3600000) / 1000),
            sunset: Math.floor((Date.now() + 7200000) / 1000)
          }
        })
      }, 1000)
    })
  },

  /**
   * 모의 도시 검색 데이터
   */
  getMockCitySearch(query) {
    const cities = [
      { id: '1', name: '서울', country: 'KR', lat: 37.5683, lon: 126.9778 },
      { id: '2', name: '부산', country: 'KR', lat: 35.1796, lon: 129.0756 },
      { id: '3', name: '인천', country: 'KR', lat: 37.4563, lon: 126.7052 },
      { id: '4', name: '대구', country: 'KR', lat: 35.8714, lon: 128.6014 },
      { id: '5', name: '대전', country: 'KR', lat: 36.3504, lon: 127.3845 },
      { id: '6', name: '광주', country: 'KR', lat: 35.1595, lon: 126.8526 },
      { id: '7', name: '울산', country: 'KR', lat: 35.5384, lon: 129.3114 },
      { id: '8', name: '수원', country: 'KR', lat: 37.2636, lon: 127.0286 },
      { id: '9', name: '고양', country: 'KR', lat: 37.6584, lon: 126.8320 },
      { id: '10', name: '용인', country: 'KR', lat: 37.2410, lon: 127.1776 }
    ]
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = cities.filter(city => 
          city.name.toLowerCase().includes(query.toLowerCase())
        )
        resolve(filtered)
      }, 300)
    })
  }
}
