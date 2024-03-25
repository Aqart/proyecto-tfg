import { createRouter, createWebHistory } from 'vue-router'
import HomeRouter from '@/modules/Home/router'
import AuthRouter from '@/modules/Auth/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      ...HomeRouter
    },
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/auth',
      ...AuthRouter
    }
  ]
})

export default router
