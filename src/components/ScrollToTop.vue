<template>
  <Transition name="scroll-to-top">
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="scroll-to-top-btn"
      :class="{ 'dark-mode': isDarkMode }"
      aria-label="맨 위로 이동"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  </Transition>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ScrollToTop',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const showButton = ref(false)

    const handleScroll = () => {
      // 300px 이상 스크롤되면 버튼 표시
      showButton.value = window.scrollY > 300
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      showButton,
      scrollToTop
    }
  }
}
</script>

<style scoped>
.scroll-to-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    background: var(--primary-hover);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.dark-mode {
    background: var(--primary-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    
    &:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
  }
}

/* 애니메이션 */
.scroll-to-top-enter-active,
.scroll-to-top-leave-active {
  transition: all 0.3s ease;
}

.scroll-to-top-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.scroll-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .scroll-to-top-btn {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
}
</style>
