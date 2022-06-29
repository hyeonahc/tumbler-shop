import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import SignUp from './SignUp.vue'
import SignIn from './SignIn.vue'
import MyPage from './MyPage.vue'
import Admin from './Admin.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/mypage',
      component: MyPage,
      meta: { 
        auth: true // 로그인을 해야만 접근 할 수 있는 페이지로 설정
      }
    },
    {
      path: '/admin',
      component: Admin
    },
  ]
})
