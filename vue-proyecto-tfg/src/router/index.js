import { createRouter, createWebHistory } from 'vue-router'
import HomeRouter from '@/modules/Home/router'
import AuthRouter from '@/modules/Auth/router'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      ...HomeRouter,
      meta: { requiresAuth: true }
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isTokenExpired = await store.dispatch('Auth/isTokenExpired')
  if (requiresAuth && isTokenExpired) {
    next('/login')
  } else {
    // const rutaTo = to.path.split('/').slice(0, -2).join('/')
    const rutaFrom = from.matched[1] ? from.matched[1].path : from.path
    console.log('router', rutaFrom, to.path, from.matched[0], from.matched[1])

    if (rutaFrom !== to.path) {
      store.commit('Shared/setMostrar', false)
    }
    next()
  }
})

export default router