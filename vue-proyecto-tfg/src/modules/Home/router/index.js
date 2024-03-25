import AuthRouter from '@/modules/Auth/router'
export default {
  name: 'home',
  component: () =>
    import(/* webpackChunkName: "HomeComponent" */ '@/modules/Home/layouts/HomeLayout.vue'),
  children: [
    {
      path: '/auth',
      ...AuthRouter
    }
  ]
}
