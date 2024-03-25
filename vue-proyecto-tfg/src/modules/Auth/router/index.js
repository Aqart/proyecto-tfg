export default {
  name: 'auth',
  component: () => import(/* webpackChunkName: "Auth" */ '@/modules/Auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: '/login',
      name: 'auth-login',
      component: () => import(/* webpackChunkName: "Login" */ '@/modules/Auth/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'auth-register',
      component: () =>
        import(/* webpackChunkName: "Register" */ '@/modules/Auth/views/RegisterView.vue')
    }
  ]
}
