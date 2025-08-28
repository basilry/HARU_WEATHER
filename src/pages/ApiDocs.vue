<template>
  <div class="api-docs-page">
    <div class="container">
      <!-- 헤더 섹션 -->
      <header class="page-header">
        <h1 class="page-title">📚 API 문서</h1>
        <p class="page-subtitle">
          HARU WEATHER에서 사용하는 API들과 데이터 구조에 대한 상세 정보입니다.
        </p>
      </header>

      <!-- OpenWeatherMap API -->
      <section class="content-section">
        <div class="section-header">
          <h2>🌍 OpenWeatherMap API</h2>
        </div>
        <div class="content-card">
          <p>
            HARU WEATHER는 <strong>OpenWeatherMap API</strong>를 사용하여 전 세계의 실시간 날씨 데이터를 제공합니다.
            이 API는 정확하고 신뢰할 수 있는 날씨 정보를 제공하는 글로벌 서비스입니다.
          </p>
          
          <div class="api-info">
            <h3>🔗 기본 정보</h3>
            <ul>
              <li><strong>공식 사이트:</strong> <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">https://openweathermap.org/</a></li>
              <li><strong>API 버전:</strong> 2.5</li>
              <li><strong>요청 제한:</strong> 무료 계정 기준 1분당 60회</li>
              <li><strong>데이터 업데이트:</strong> 10분마다</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 사용된 API 엔드포인트 -->
      <section class="content-section">
        <div class="section-header">
          <h2>🔌 사용된 API 엔드포인트</h2>
        </div>
        
        <!-- Current Weather API -->
        <div class="content-card">
          <h3 class="api-title">1. Current Weather Data</h3>
          <div class="api-endpoint">
            <code>GET /data/2.5/weather</code>
          </div>
          <p>현재 날씨 정보를 가져오는 API입니다.</p>
          
          <h4>매개변수</h4>
          <div class="param-table">
            <div class="param-row">
              <div class="param-name">lat</div>
              <div class="param-type">number</div>
              <div class="param-desc">위도</div>
            </div>
            <div class="param-row">
              <div class="param-name">lon</div>
              <div class="param-type">number</div>
              <div class="param-desc">경도</div>
            </div>
            <div class="param-row">
              <div class="param-name">appid</div>
              <div class="param-type">string</div>
              <div class="param-desc">API 키</div>
            </div>
            <div class="param-row">
              <div class="param-name">units</div>
              <div class="param-type">string</div>
              <div class="param-desc">단위 (metric: 섭씨)</div>
            </div>
            <div class="param-row">
              <div class="param-name">lang</div>
              <div class="param-type">string</div>
              <div class="param-desc">언어 설정 (kr: 한국어)</div>
            </div>
          </div>
          
          <h4>응답 예시</h4>
          <div class="code-block">
            <pre><code>{
  "coord": { "lon": 126.9778, "lat": 37.5683 },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "맑음",
      "icon": "01d"
    }
  ],
  "main": {
    "temp": 15.2,
    "feels_like": 14.8,
    "temp_min": 12.1,
    "temp_max": 18.3,
    "pressure": 1015,
    "humidity": 65
  },
  "wind": { "speed": 2.1, "deg": 180 },
  "name": "Seoul",
  "sys": { "country": "KR" }
}</code></pre>
          </div>
        </div>

        <!-- 5-day Forecast API -->
        <div class="content-card">
          <h3 class="api-title">2. 5 Day Weather Forecast</h3>
          <div class="api-endpoint">
            <code>GET /data/2.5/forecast</code>
          </div>
          <p>5일간의 날씨 예보 정보를 가져오는 API입니다. (3시간 간격으로 40개 데이터)</p>
          
          <h4>매개변수</h4>
          <div class="param-table">
            <div class="param-row">
              <div class="param-name">lat</div>
              <div class="param-type">number</div>
              <div class="param-desc">위도</div>
            </div>
            <div class="param-row">
              <div class="param-name">lon</div>
              <div class="param-type">number</div>
              <div class="param-desc">경도</div>
            </div>
            <div class="param-row">
              <div class="param-name">appid</div>
              <div class="param-type">string</div>
              <div class="param-desc">API 키</div>
            </div>
            <div class="param-row">
              <div class="param-name">units</div>
              <div class="param-type">string</div>
              <div class="param-desc">단위 (metric: 섭씨)</div>
            </div>
            <div class="param-row">
              <div class="param-name">lang</div>
              <div class="param-type">string</div>
              <div class="param-desc">언어 설정 (kr: 한국어)</div>
            </div>
          </div>
        </div>

        <!-- Geocoding API -->
        <div class="content-card">
          <h3 class="api-title">3. Geocoding API</h3>
          <div class="api-endpoint">
            <code>GET /geo/1.0/direct</code>
          </div>
          <p>도시 이름으로 위도/경도를 검색하는 API입니다.</p>
          
          <h4>매개변수</h4>
          <div class="param-table">
            <div class="param-row">
              <div class="param-name">q</div>
              <div class="param-type">string</div>
              <div class="param-desc">도시 이름</div>
            </div>
            <div class="param-row">
              <div class="param-name">limit</div>
              <div class="param-type">number</div>
              <div class="param-desc">결과 개수 제한</div>
            </div>
            <div class="param-row">
              <div class="param-name">appid</div>
              <div class="param-type">string</div>
              <div class="param-desc">API 키</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 기타 API -->
      <section class="content-section">
        <div class="section-header">
          <h2>🗺️ 기타 사용된 API</h2>
        </div>
        
        <div class="content-card">
          <h3 class="api-title">Geolocation API</h3>
          <p>
            브라우저의 내장 <strong>Geolocation API</strong>를 사용하여 사용자의 현재 위치를 확인합니다.
            이 API는 HTTPS 환경에서만 동작하며, 사용자의 동의가 필요합니다.
          </p>
          
          <h4>사용 방법</h4>
          <div class="code-block">
            <pre><code>navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // 위치 정보 활용
  },
  (error) => {
    console.error('위치 정보를 가져올 수 없습니다:', error);
  }
);</code></pre>
          </div>
        </div>

        <div class="content-card">
          <h3 class="api-title">Leaflet.js & OpenStreetMap</h3>
          <p>
            날씨 레이더 맵을 구현하기 위해 <strong>Leaflet.js</strong> 라이브러리와 
            <strong>OpenStreetMap</strong> 타일을 사용합니다.
          </p>
          
          <ul>
            <li><strong>Leaflet.js:</strong> 인터랙티브 지도를 위한 JavaScript 라이브러리</li>
            <li><strong>OpenStreetMap:</strong> 오픈소스 지도 타일 서비스</li>
            <li><strong>OpenWeatherMap 레이어:</strong> 날씨 정보 오버레이</li>
          </ul>
        </div>
      </section>

      <!-- 에러 처리 -->
      <section class="content-section">
        <div class="section-header">
          <h2>⚠️ 에러 처리</h2>
        </div>
        
        <div class="content-card">
          <h3>일반적인 HTTP 상태 코드</h3>
          <div class="error-table">
            <div class="error-row">
              <div class="error-code">200</div>
              <div class="error-desc">성공</div>
            </div>
            <div class="error-row">
              <div class="error-code">401</div>
              <div class="error-desc">유효하지 않은 API 키</div>
            </div>
            <div class="error-row">
              <div class="error-code">404</div>
              <div class="error-desc">도시를 찾을 수 없음</div>
            </div>
            <div class="error-row">
              <div class="error-code">429</div>
              <div class="error-desc">API 호출 제한 초과</div>
            </div>
            <div class="error-row">
              <div class="error-code">500</div>
              <div class="error-desc">서버 내부 오류</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 참고 자료 -->
      <section class="content-section">
        <div class="section-header">
          <h2>📖 참고 자료</h2>
        </div>
        
        <div class="content-card">
          <div class="reference-grid">
            <div class="reference-item">
              <h4>🌐 OpenWeatherMap</h4>
              <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">
                공식 API 문서
              </a>
            </div>
            <div class="reference-item">
              <h4>🗺️ Leaflet.js</h4>
              <a href="https://leafletjs.com/" target="_blank" rel="noopener noreferrer">
                Leaflet 공식 사이트
              </a>
            </div>
            <div class="reference-item">
              <h4>📍 Geolocation API</h4>
              <a href="https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API" target="_blank" rel="noopener noreferrer">
                MDN 웹 문서
              </a>
            </div>
            <div class="reference-item">
              <h4>🗺️ OpenStreetMap</h4>
              <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">
                OpenStreetMap 프로젝트
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiDocs'
}
</script>

<style lang="scss" scoped>
.api-docs-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  
  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .page-subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
}

.content-section {
  margin-bottom: 3rem;
  
  .section-header {
    margin-bottom: 1.5rem;
    
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--text-color);
      margin: 0;
    }
  }
}

.content-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  p {
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
}

.api-info {
  margin-top: 2rem;
  
  h3 {
    color: var(--text-color);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-color);
      color: var(--text-secondary);
      
      &:last-child {
        border-bottom: none;
      }
      
      strong {
        color: var(--text-color);
      }
      
      a {
        color: var(--primary-color);
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.api-title {
  color: var(--primary-color);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.api-endpoint {
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  
  code {
    color: var(--primary-color);
    font-weight: 600;
  }
}

.param-table, .error-table {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
}

.param-row, .error-row {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  div {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-color);
    
    &:nth-child(odd) {
      background: var(--secondary-bg);
    }
  }
  
  &:last-child div {
    border-bottom: none;
  }
}

.error-row {
  grid-template-columns: 1fr 3fr;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.param-name, .error-code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-weight: 600;
  color: var(--primary-color);
}

.param-type {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: var(--text-secondary);
  font-style: italic;
}

.param-desc, .error-desc {
  color: var(--text-secondary);
}

.code-block {
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  overflow-x: auto;
  
  pre {
    margin: 0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--text-color);
  }
}

.reference-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.reference-item {
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-color);
  text-align: center;
  
  h4 {
    color: var(--text-color);
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
