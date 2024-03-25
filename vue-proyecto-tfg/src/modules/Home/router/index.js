import AuthRouter from '@/modules/Auth/router'
import ConsumiblesRouter from '@/modules/Consumible/router'

export default {
  name: 'home',
  component: () =>
    import(/* webpackChunkName: "HomeComponent" */ '@/modules/Home/layouts/HomeLayout.vue'),
  children: [
    {
      path: '/auth',
      ...AuthRouter
    },
    {
      path: '/consumibles',
      ...ConsumiblesRouter
    }
  ]
}
