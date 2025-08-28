<template>
  <div id="app" :data-theme="isDarkMode ? 'dark' : 'light'">
    <div class="app-layout">
      <!-- 헤더 -->
      <Header />

      <!-- 메인 콘텐츠 -->
      <main class="main-content">
        <router-view />
      </main>

    <!-- Footer -->
    <Footer />
    
    <!-- 스크롤 to top 버튼 -->
    <ScrollToTop :isDarkMode="isDarkMode" />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme.js'
import { useWeatherStore } from './composables/useWeatherStore.js'
import Header from '@components/Header.vue'
import Footer from '@components/Footer.vue'
import ScrollToTop from '@components/ScrollToTop.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ScrollToTop
  },
  setup() {
    const { isDarkMode, loadTheme } = useTheme()
    const { loadFavorites } = useWeatherStore()

    // 컴포넌트 마운트 시 실행
    onMounted(() => {
      // 테마 및 즐겨찾기 설정 불러오기
      loadTheme()
      loadFavorites()
    })

    return {
      isDarkMode
    }
  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
}
</style>