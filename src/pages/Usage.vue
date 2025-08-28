<template>
  <div class="usage-page">
    <div class="container">
      <!-- 헤더 섹션 -->
      <header class="page-header">
        <h1 class="page-title">📖 사용법</h1>
        <p class="page-subtitle">
          HARU WEATHER를 효과적으로 사용하는 방법과 다양한 기능들을 소개합니다.
        </p>
      </header>

      <!-- 시작하기 -->
      <section class="content-section">
        <div class="section-header">
          <h2>🚀 시작하기</h2>
        </div>
        <div class="content-card">
          <p>
            HARU WEATHER는 별도의 설치나 회원가입 없이 바로 사용할 수 있습니다. 
            웹 브라우저에서 사이트에 접속하면 자동으로 현재 위치의 날씨 정보를 표시합니다.
          </p>
          
          <div class="step-guide">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>위치 권한 허용</h3>
                <p>브라우저에서 위치 정보 사용 권한을 요청하면 "허용"을 클릭하세요.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>날씨 정보 확인</h3>
                <p>현재 위치의 실시간 날씨와 5일 예보를 확인할 수 있습니다.</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>추가 기능 활용</h3>
                <p>도시 검색, 즐겨찾기, 레이더 맵 등의 기능을 자유롭게 사용하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 주요 기능 사용법 -->
      <section class="content-section">
        <div class="section-header">
          <h2>⭐ 주요 기능 사용법</h2>
        </div>
        
        <!-- 도시 검색 -->
        <div class="content-card">
          <h3 class="feature-title">🔍 도시 검색</h3>
          <div class="feature-content">
            <div class="feature-description">
              <p>전 세계 어떤 도시의 날씨든 쉽게 검색할 수 있습니다.</p>
              <ol>
                <li>화면 상단의 검색창에 도시 이름을 입력하세요</li>
                <li>자동완성 목록에서 원하는 도시를 선택하거나 Enter 키를 누르세요</li>
                <li>해당 도시의 날씨 정보가 즉시 표시됩니다</li>
              </ol>
              
              <div class="tip-box">
                <strong>💡 팁:</strong>
                <ul>
                  <li>한글로도 검색 가능합니다 (예: "서울", "부산")</li>
                  <li>영문 도시명도 지원합니다 (예: "New York", "Tokyo")</li>
                  <li>자동완성을 활용하여 정확한 도시를 선택하세요</li>
                </ul>
              </div>
            </div>
            <div class="feature-visual">
              <div class="demo-search">
                <div class="search-demo">
                  <input placeholder="도시 이름을 입력하세요..." value="서울" readonly />
                  <button>🔍</button>
                </div>
                <div class="suggestions-demo">
                  <div class="suggestion-item-demo">
                    <span>Seoul, KR</span>
                  </div>
                  <div class="suggestion-item-demo">
                    <span>Seoul, US</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 현재 위치 -->
        <div class="content-card">
          <h3 class="feature-title">📍 현재 위치 날씨</h3>
          <div class="feature-content">
            <div class="feature-description">
              <p>GPS를 이용해 현재 위치의 날씨를 자동으로 가져옵니다.</p>
              <ol>
                <li>페이지 로드 시 자동으로 현재 위치를 감지합니다</li>
                <li>위치 버튼(📍)을 클릭하여 수동으로 업데이트할 수 있습니다</li>
                <li>위치 정보 사용을 거부한 경우, 기본 도시(서울)가 표시됩니다</li>
              </ol>
              
              <div class="warning-box">
                <strong>⚠️ 주의사항:</strong>
                <ul>
                  <li>HTTPS 환경에서만 위치 정보 사용이 가능합니다</li>
                  <li>모바일에서 더욱 정확한 위치 정보를 제공합니다</li>
                  <li>위치 정보는 서버에 저장되지 않습니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 즐겨찾기 -->
        <div class="content-card">
          <h3 class="feature-title">⭐ 즐겨찾기</h3>
          <div class="feature-content">
            <div class="feature-description">
              <p>자주 확인하는 도시들을 즐겨찾기에 저장하여 빠르게 접근할 수 있습니다.</p>
              
              <h4>즐겨찾기 추가</h4>
              <ol>
                <li>날씨 카드에서 ⭐ 버튼을 클릭하세요</li>
                <li>즐겨찾기에 추가된 도시는 상단에 작은 카드로 표시됩니다</li>
                <li>최대 10개까지 즐겨찾기에 저장할 수 있습니다</li>
              </ol>
              
              <h4>즐겨찾기 사용</h4>
              <ol>
                <li>상단의 즐겨찾기 도시 카드를 클릭하세요</li>
                <li>해당 도시의 날씨 정보가 즉시 로드됩니다</li>
                <li>× 버튼을 클릭하여 즐겨찾기에서 제거할 수 있습니다</li>
              </ol>
              
              <div class="tip-box">
                <strong>💡 팁:</strong>
                <ul>
                  <li>즐겨찾기는 브라우저에 저장되어 다음 방문 시에도 유지됩니다</li>
                  <li>자주 출장가는 도시나 고향을 저장해 보세요</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 날씨 레이더 -->
        <div class="content-card">
          <h3 class="feature-title">🗺️ 날씨 레이더</h3>
          <div class="feature-content">
            <div class="feature-description">
              <p>인터랙티브 지도를 통해 시각적인 날씨 정보를 확인할 수 있습니다.</p>
              
              <h4>레이더 맵 조작</h4>
              <ul>
                <li><strong>확대/축소:</strong> 마우스 휠 또는 +/- 버튼 사용</li>
                <li><strong>지도 이동:</strong> 드래그하여 다른 지역 확인</li>
                <li><strong>레이어 전환:</strong> 우측 상단의 레이어 버튼으로 강수량, 구름 등 전환</li>
                <li><strong>전체화면:</strong> 전체화면 버튼으로 크게 보기</li>
              </ul>
              
              <h4>레이더 정보</h4>
              <ul>
                <li><strong>강수량 레이어:</strong> 비나 눈의 강도를 색상으로 표시</li>
                <li><strong>구름 레이어:</strong> 구름의 분포와 밀도 확인</li>
                <li><strong>기온 레이어:</strong> 지역별 온도 분포</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 테마 및 설정 -->
      <section class="content-section">
        <div class="section-header">
          <h2>🎨 테마 및 설정</h2>
        </div>
        
        <div class="content-card">
          <h3 class="feature-title">🌙 다크/라이트 모드</h3>
          <div class="feature-content">
            <div class="feature-description">
              <p>사용자의 선호에 따라 밝은 테마와 어두운 테마를 선택할 수 있습니다.</p>
              
              <ul>
                <li>헤더 우측의 🌙/☀️ 버튼을 클릭하여 테마를 전환하세요</li>
                <li>설정한 테마는 자동으로 저장되어 다음 방문 시에도 유지됩니다</li>
                <li>시스템 기본 설정을 따를 수도 있습니다</li>
              </ul>
              
              <div class="theme-preview">
                <div class="theme-option">
                  <div class="theme-demo light">☀️ 라이트 모드</div>
                  <span>밝고 깔끔한 인터페이스</span>
                </div>
                <div class="theme-option">
                  <div class="theme-demo dark">🌙 다크 모드</div>
                  <span>눈의 피로를 줄이는 어두운 테마</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 키보드 단축키 -->
      <section class="content-section">
        <div class="section-header">
          <h2>⌨️ 키보드 단축키</h2>
        </div>
        
        <div class="content-card">
          <div class="shortcut-grid">
            <div class="shortcut-item">
              <div class="shortcut-key">Enter</div>
              <div class="shortcut-desc">검색 실행</div>
            </div>
            <div class="shortcut-item">
              <div class="shortcut-key">Esc</div>
              <div class="shortcut-desc">검색 자동완성 닫기</div>
            </div>
            <div class="shortcut-item">
              <div class="shortcut-key">↑ ↓</div>
              <div class="shortcut-desc">자동완성 항목 선택</div>
            </div>
            <div class="shortcut-item">
              <div class="shortcut-key">Ctrl + /</div>
              <div class="shortcut-desc">검색창에 포커스</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 문제해결 -->
      <section class="content-section">
        <div class="section-header">
          <h2>🔧 문제해결</h2>
        </div>
        
        <div class="content-card">
          <div class="faq-list">
            <div class="faq-item">
              <h4>Q. 위치 정보를 가져올 수 없다고 나와요</h4>
              <p>
                브라우저 설정에서 위치 정보 사용을 허용했는지 확인하세요. 
                HTTPS가 아닌 환경에서는 위치 정보를 사용할 수 없습니다.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>Q. 도시 검색이 안 돼요</h4>
              <p>
                정확한 도시명을 입력했는지 확인하세요. 자동완성 기능을 활용하면 
                더욱 정확한 결과를 얻을 수 있습니다.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>Q. 날씨 정보가 로드되지 않아요</h4>
              <p>
                인터넷 연결 상태를 확인하고 페이지를 새로고침해 보세요. 
                지속적인 문제가 있다면 API 서버의 일시적인 문제일 수 있습니다.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>Q. 레이더 맵이 표시되지 않아요</h4>
              <p>
                브라우저에서 JavaScript가 활성화되어 있는지 확인하세요. 
                일부 광고 차단 프로그램이 지도 로딩을 방해할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Usage'
}
</script>

<style lang="scss" scoped>
.usage-page {
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

.step-guide {
  margin-top: 2rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
}

.step-number {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  
  h3 {
    color: var(--text-color);
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
}

.feature-title {
  color: var(--primary-color);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.feature-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.feature-description {
  ol, ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
      color: var(--text-secondary);
    }
  }
  
  h4 {
    color: var(--text-color);
    font-size: 1.1rem;
    font-weight: 600;
    margin: 1.5rem 0 0.75rem 0;
  }
}

.tip-box, .warning-box {
  background: var(--secondary-bg);
  border-left: 4px solid var(--primary-color);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;
  
  strong {
    color: var(--primary-color);
    display: block;
    margin-bottom: 0.5rem;
  }
  
  ul {
    margin: 0;
    padding-left: 1rem;
    
    li {
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }
  }
}

.warning-box {
  border-left-color: #ff6b6b;
  
  strong {
    color: #ff6b6b;
  }
}

.feature-visual {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.demo-search {
  width: 100%;
  max-width: 300px;
}

.search-demo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: var(--text-color);
    font-size: 0.9rem;
  }
  
  button {
    padding: 0.75rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
}

.suggestions-demo {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.suggestion-item-demo {
  padding: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: var(--hover-bg);
  }
}

.theme-preview {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.theme-option {
  flex: 1;
  text-align: center;
  
  span {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
}

.theme-demo {
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  
  &.light {
    background: #ffffff;
    color: #333333;
    border: 1px solid #e0e0e0;
  }
  
  &.dark {
    background: #2a2a2a;
    color: #ffffff;
    border: 1px solid #404040;
  }
}

.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--secondary-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.shortcut-key {
  background: var(--bg-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85rem;
  color: var(--text-color);
  white-space: nowrap;
}

.shortcut-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.faq-list {
  .faq-item {
    margin-bottom: 2rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    h4 {
      color: var(--primary-color);
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }
    
    p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
    }
  }
}
</style>
