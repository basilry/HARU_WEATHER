<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- 상단 섹션 -->
      <div class="footer-content">
        <!-- 프로젝트 정보 -->
        <div class="footer-section project-info">
          <h3 class="footer-title">🌤️ HARU WEATHER</h3>
          <p class="footer-description">
            실시간 날씨 정보와 레이더를 제공하는 
            현대적인 웹 애플리케이션입니다.
          </p>
          <div class="tech-stack">
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">OpenWeatherMap API</span>
            <span class="tech-tag">Leaflet.js</span>
          </div>
        </div>

        <!-- 연락처 정보 -->
        <div class="footer-section contact-info">
          <h4 class="section-title">연락처</h4>
          <div class="contact-links">
            <a 
              href="mailto:basilry@gmail.com" 
              class="contact-link"
              title="이메일 보내기"
            >
              <span class="contact-icon">📧</span>
              <span class="contact-text">Gmail</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/basilry" 
              target="_blank" 
              rel="noopener noreferrer"
              class="contact-link"
              title="LinkedIn 프로필"
            >
              <span class="contact-icon">💼</span>
              <span class="contact-text">LinkedIn</span>
            </a>
            <a 
              href="https://basilry.kim" 
              target="_blank" 
              rel="noopener noreferrer"
              class="contact-link"
              title="개인 블로그"
            >
              <span class="contact-icon">📝</span>
              <span class="contact-text">Blog</span>
            </a>
            <a 
              href="https://github.com/basilry" 
              target="_blank" 
              rel="noopener noreferrer"
              class="contact-link"
              title="GitHub 프로필"
            >
              <span class="contact-icon">💻</span>
              <span class="contact-text">GitHub</span>
            </a>
          </div>
        </div>

        <!-- 추가 정보 -->
        <div class="footer-section additional-info">
          <h4 class="section-title">정보</h4>
          <div class="info-links">
            <router-link to="/about" class="info-link">프로젝트 소개</router-link>
            <router-link to="/api-docs" class="info-link">API 문서</router-link>
            <router-link to="/usage" class="info-link">사용법</router-link>
            <router-link to="/feedback" class="info-link">피드백</router-link>
          </div>
        </div>
      </div>

      <!-- 하단 섹션 -->
      <div class="footer-bottom">
        <div class="copyright">
          <p>© {{ currentYear }} HARU WEATHER. 개인 프로젝트로 제작되었습니다.</p>
          <p class="powered-by">
            Powered by 
            <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
              OpenWeatherMap
            </a>
          </p>
        </div>
        <div class="footer-meta">
          <span class="version">v1.0.0</span>
          <span class="last-updated">Last updated: {{ formatDate(new Date()) }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const currentYear = computed(() => {
      return new Date().getFullYear()
    })

    const formatDate = (date) => {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long'
      })
    }

    return {
      currentYear,
      formatDate
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../styles/components/footer.module.scss' as footer;
</style>
