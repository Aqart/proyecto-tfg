export default {
  name: 'GastosGenerales',
  component: () => import('@/modules/GastosGenerales/layouts/GastosLayout.vue'),
  children: [
    {
      path: '/gastos-generales',
      name: 'GastosGenerales',
      component: () => import('@/modules/GastosGenerales/views/GastosView.vue')
    }
  ]
}
