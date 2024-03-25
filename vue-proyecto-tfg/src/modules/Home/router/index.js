import ConsumiblesRouter from '@/modules/Consumible/router'

export default {
  name: 'home',
  component: () =>
    import(/* webpackChunkName: "HomeComponent" */ '@/modules/Home/layouts/HomeLayout.vue'),
  children: [
    {
      path: '/consumibles',
      ...ConsumiblesRouter
    }
  ]
}
