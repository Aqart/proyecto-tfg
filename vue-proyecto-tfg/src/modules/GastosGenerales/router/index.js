export default {
  name: 'GastosGenerales',
  component: () => import('@/modules/GastosGenerales/layouts/GastosGenLayout.vue'),
  children: [
    {
      path: '/gastos-generales',
      name: 'GastosGenerales',
      component: () => import('@/modules/GastosGenerales/views/GastosGenView.vue')
    }
  ]
}
