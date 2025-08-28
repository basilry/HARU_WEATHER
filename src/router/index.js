import { createRouter, createWebHistory } from 'vue-router'

// 페이지 컴포넌트들을 lazy loading으로 import
const Home = () => import('../pages/Home.vue')
const About = () => import('../pages/About.vue')
const ApiDocs = () => import('../pages/ApiDocs.vue')
const Usage = () => import('../pages/Usage.vue')
const Feedback = () => import('../pages/Feedback.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'HARU WEATHER - 실시간 날씨 정보'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '프로젝트 소개 - HARU WEATHER'
    }
  },
  {
    path: '/api-docs',
    name: 'ApiDocs',
    component: ApiDocs,
    meta: {
      title: 'API 문서 - HARU WEATHER'
    }
  },
  {
    path: '/usage',
    name: 'Usage',
    component: Usage,
    meta: {
      title: '사용법 - HARU WEATHER'
    }
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
    meta: {
      title: '피드백 - HARU WEATHER'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 라우터 가드로 페이지 제목 설정
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
