export default {
  name: 'GastosGenerales',
  component: () => import('@/modules/GastosGenerales/layouts/GastosLayout.vue'),
  children: [
    {
      path: '/gastos-generales',
      name: 'GastosGenerales',
      component: () => import('@/modules/GastosGenerales/views/GastosView.vue')
    },
    {
      path: '/gastos-generales/add',
      name: 'add-gasto',
      component: () => import('@/modules/GastosGenerales/views/GastosView.vue')
    },
    {
      path: '/gastos-generales/edit/:id',
      name: 'edit-gasto',
      component: () => import('@/modules/GastosGenerales/views/GastosView.vue')
    }
  ]
}
