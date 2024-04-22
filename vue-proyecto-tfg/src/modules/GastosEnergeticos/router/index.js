export default {
  name: 'GastosEnergeticos',
  component: () => import('@/modules/GastosEnergeticos/layouts/GastosLayout.vue'),
  children: [
    {
      path: '/gastos-energeticos',
      name: 'GastosEnergeticos',
      component: () => import('@/modules/GastosEnergeticos/views/GastosView.vue')
    }
  ]
}
