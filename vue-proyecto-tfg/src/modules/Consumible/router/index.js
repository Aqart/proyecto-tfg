export default {
  name: 'consumibles',
  component: () => import('@/modules/Consumible/layouts/ConsumibleLayout.vue'),
  children: [
    {
      path: '/consumibles',
      name: 'list-consumibles',
      component: () => import('@/modules/Consumible/views/ConsumiblesView.vue')
    },
    {
      path: '/consumibles/add',
      name: 'add-consumible',
      component: () => import('@/modules/Consumible/views/AddConsumiblesView.vue'),
    },
    {
      path: '/consumibles/edit/:id',
      name: 'edit-consumible',
      component: () => import('@/modules/Consumible/views/EditConsumiblesView.vue'),
    }
  ]
}