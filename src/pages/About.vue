<template>
  <div class="about-page">
    <div class="container">
      <!-- 헤더 섹션 -->
      <header class="page-header">
        <h1 class="page-title">🌤️ 프로젝트 소개</h1>
        <p class="page-subtitle">
          HARU WEATHER는 실시간 날씨 정보와 인터랙티브 레이더를 제공하는 
          현대적인 웹 애플리케이션입니다.
        </p>
      </header>

      <!-- 프로젝트 개요 -->
      <section class="content-section">
        <div class="section-header">
          <h2>📋 프로젝트 개요</h2>
        </div>
        <div class="content-card">
          <p>
            HARU WEATHER는 사용자에게 정확하고 직관적인 날씨 정보를 제공하기 위해 개발된 웹 애플리케이션입니다.
            OpenWeatherMap API를 활용하여 전 세계 도시의 실시간 날씨 데이터를 제공하며, 
            Leaflet.js를 이용한 인터랙티브 레이더 맵으로 시각적인 날씨 정보를 확인할 수 있습니다.
          </p>
          <div class="feature-grid">
            <div class="feature-item">
              <div class="feature-icon">🔍</div>
              <h3>스마트 검색</h3>
              <p>자동완성 기능이 포함된 도시 검색으로 쉽고 빠른 날씨 조회</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📍</div>
              <h3>위치 기반</h3>
              <p>현재 위치를 자동으로 감지하여 즉시 날씨 정보 제공</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">⭐</div>
              <h3>즐겨찾기</h3>
              <p>자주 확인하는 도시들을 즐겨찾기로 저장하여 빠른 액세스</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🗺️</div>
              <h3>레이더 맵</h3>
              <p>실시간 날씨 레이더로 강수량, 구름 상태 등을 시각적으로 확인</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📱</div>
              <h3>반응형 디자인</h3>
              <p>모든 디바이스에서 최적화된 사용자 경험 제공</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🌙</div>
              <h3>다크/라이트 모드</h3>
              <p>사용자 선호에 따른 테마 설정으로 편안한 사용 환경</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 기술 스택 -->
      <section class="content-section">
        <div class="section-header">
          <h2>🛠️ 기술 스택</h2>
        </div>
        <div class="content-card">
          <div class="tech-category">
            <h3>Frontend</h3>
            <div class="tech-tags">
              <span class="tech-tag">Vue 3</span>
              <span class="tech-tag">Composition API</span>
              <span class="tech-tag">Vue Router</span>
              <span class="tech-tag">SCSS</span>
              <span class="tech-tag">Vite</span>
            </div>
          </div>
          <div class="tech-category">
            <h3>APIs & Libraries</h3>
            <div class="tech-tags">
              <span class="tech-tag">OpenWeatherMap API</span>
              <span class="tech-tag">Leaflet.js</span>
              <span class="tech-tag">Geolocation API</span>
            </div>
          </div>
          <div class="tech-category">
            <h3>개발 도구</h3>
            <div class="tech-tags">
              <span class="tech-tag">Node.js</span>
              <span class="tech-tag">npm</span>
              <span class="tech-tag">Git</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 프로젝트 목표 -->
      <section class="content-section">
        <div class="section-header">
          <h2>🎯 프로젝트 목표</h2>
        </div>
        <div class="content-card">
          <ul class="goal-list">
            <li>
              <strong>사용자 중심 디자인:</strong> 
              직관적이고 사용하기 쉬운 인터페이스 제공
            </li>
            <li>
              <strong>정확한 데이터:</strong> 
              신뢰할 수 있는 날씨 정보 서비스 구현
            </li>
            <li>
              <strong>성능 최적화:</strong> 
              빠른 로딩 속도와 부드러운 사용자 경험
            </li>
            <li>
              <strong>접근성:</strong> 
              모든 사용자가 편리하게 이용할 수 있는 웹 애플리케이션
            </li>
            <li>
              <strong>현대적 기술:</strong> 
              최신 웹 기술을 활용한 확장 가능한 아키텍처
            </li>
          </ul>
        </div>
      </section>

      <!-- 개발자 정보 -->
      <section class="content-section">
        <div class="section-header">
          <h2>👨‍💻 개발자 정보</h2>
        </div>
        <div class="content-card">
          <div class="developer-info">
            <div class="developer-avatar">
              <div class="avatar-placeholder">🧑‍💻</div>
            </div>
            <div class="developer-details">
              <h3>Basilry</h3>
              <p class="developer-role">Frontend Developer</p>
              <p class="developer-description">
                웹 개발에 열정을 가진 개발자로, 사용자 경험을 중시하며 
                현대적이고 효율적인 웹 애플리케이션을 만들어 나가고 있습니다.
              </p>
              <div class="contact-links">
                <a 
                  href="mailto:basilry@gmail.com" 
                  class="contact-link"
                  title="이메일 보내기"
                >
                  📧 Gmail
                </a>
                <a 
                  href="https://www.linkedin.com/in/basilry" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="contact-link"
                  title="LinkedIn 프로필"
                >
                  💼 LinkedIn
                </a>
                <a 
                  href="https://basilry.kim" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="contact-link"
                  title="개인 블로그"
                >
                  📝 Blog
                </a>
                <a 
                  href="https://github.com/basilry" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="contact-link"
                  title="GitHub 프로필"
                >
                  💻 GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>
.about-page {
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
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  p {
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature-item {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-color);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  .feature-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
  }
}

.tech-category {
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 1rem;
  }
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: var(--primary-color);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.goal-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
    line-height: 1.6;
    color: var(--text-secondary);
    
    &:last-child {
      border-bottom: none;
    }
    
    strong {
      color: var(--primary-color);
      font-weight: 600;
    }
  }
}

.developer-info {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
}

.developer-avatar {
  flex-shrink: 0;
  
  .avatar-placeholder {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
  }
}

.developer-details {
  flex: 1;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.25rem;
  }
  
  .developer-role {
    color: var(--primary-color);
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  .developer-description {
    margin-bottom: 1.5rem;
  }
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  
  .contact-link {
    text-decoration: none;
    color: var(--text-color);
    background: var(--secondary-bg);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    font-size: 0.9rem;
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--hover-bg);
      transform: translateY(-1px);
    }
  }
}
</style>
