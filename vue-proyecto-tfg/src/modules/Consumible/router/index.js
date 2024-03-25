export default {
  name: 'consumible',
  component: () => import('@/modules/Consumible/layouts/ConsumibleLayout.vue'),
  children: [
    {
      path: '/consumibles',
      name: 'consumibles',
      component: () => import('@/modules/Consumible/views/ConsumibleView.vue')
    }
  ]
}