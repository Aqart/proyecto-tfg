export default {
  path: '/consumibles',
  name: 'consumible',
  component: () => import('@/modules/Consumible/layouts/ConsumibleLayout.vue'),
  children: [
    {
      path: '',
      name: 'consumibles',
      component: () => import('@/modules/Consumible/views/ConsumiblesView.vue')
    },
    {
      path: 'add',
      name: 'add-consumible',
      component: () => import('@/modules/Consumible/views/AddConsumiblesView.vue'),
    },
    {
      path: 'edit/:id',
      name: 'edit-consumible',
      component: () => import('@/modules/Consumible/views/EditConsumiblesView.vue'),
    }
  ]
}