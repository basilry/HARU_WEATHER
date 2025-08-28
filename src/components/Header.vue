<template>
  <header class="header">
    <div class="header-content">
      <router-link to="/" class="app-title-link">
        <h1 class="app-title">🌤️ HARU WEATHER</h1>
      </router-link>
      <nav class="main-nav">
        <router-link to="/" class="nav-link">홈</router-link>
        <router-link to="/about" class="nav-link">소개</router-link>
        <router-link to="/usage" class="nav-link">사용법</router-link>
        <router-link to="/api-docs" class="nav-link">API</router-link>
        <router-link to="/feedback" class="nav-link">피드백</router-link>
      </nav>
      <div class="header-controls">
        <button 
          @click="toggleDarkMode" 
          class="btn btn-secondary theme-toggle"
          :title="isDarkMode ? '라이트 모드' : '다크 모드'"
        >
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { useTheme } from '../composables/useTheme.js'

export default {
  name: 'AppHeader',
  setup() {
    const { isDarkMode, toggleDarkMode } = useTheme()

    return {
      isDarkMode,
      toggleDarkMode
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    
    @media (max-width: 768px) {
      padding: 1rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
  
  .app-title-link {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  .app-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: var(--primary-color);
    white-space: nowrap;
    
    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }
  
  .main-nav {
    display: flex;
    gap: 1.5rem;
    
    @media (max-width: 768px) {
      gap: 1rem;
      order: 3;
      width: 100%;
      justify-content: center;
    }
    
    @media (max-width: 480px) {
      gap: 0.5rem;
      flex-wrap: wrap;
    }
  }
  
  .nav-link {
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    white-space: nowrap;
    
    &:hover {
      background: var(--hover-bg);
      color: var(--primary-color);
    }
    
    &.router-link-active {
      background: var(--primary-color);
      color: white;
    }
    
    @media (max-width: 480px) {
      padding: 0.25rem 0.75rem;
      font-size: 0.9rem;
    }
  }
  
  .header-controls {
    display: flex;
    gap: 0.5rem;
  }
  
  .theme-toggle {
    font-size: 1.2rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// 버튼 스타일
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--primary-color);
  color: white;
  
  &:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  &.btn-secondary {
    background: var(--secondary-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    
    &:hover {
      background: var(--hover-bg);
    }
  }
}
</style>
