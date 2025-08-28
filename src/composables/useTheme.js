import { ref } from 'vue'
import { storageService } from '@services/storageService.js'

// 전역 상태로 관리되는 다크모드
const isDarkMode = ref(false)

// 다크모드 상태 관리를 위한 컴포저블
export function useTheme() {
  // 다크모드 토글
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    storageService.saveDarkMode(isDarkMode.value)
    document.body.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
  }

  // 다크모드 설정 불러오기
  const loadTheme = () => {
    isDarkMode.value = storageService.getDarkMode()
    document.body.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
  }

  return {
    isDarkMode,
    toggleDarkMode,
    loadTheme
  }
}
