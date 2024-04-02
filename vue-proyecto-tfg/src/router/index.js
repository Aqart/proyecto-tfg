import { createRouter, createWebHistory } from 'vue-router'
import HomeRouter from '@/modules/Home/router'
import AuthRouter from '@/modules/Auth/router'
import store from '@/store'

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

router.beforeEach((to, from, next) => {
  // Verifica si el usuario está autenticado
  if (!store.state.Auth.idToken) {
    // El usuario no está autenticado, redirige a la página de inicio de sesión
    if (to.path !== '/login') {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    // El usuario está autenticado, permite el acceso a la ruta
    if (to.path !== '/home') {
      next('/home')
    } else {
      router.push('/home')
    }
  }
})

export default router