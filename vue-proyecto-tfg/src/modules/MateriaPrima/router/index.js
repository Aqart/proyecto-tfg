export default {
  name: 'materias-primas',
  component: () => import('@/modules/Consumible/layouts/ConsumibleLayout.vue'),
  children: [
    {
      path: '/materias-primas',
      name: 'materias-primas',
      component: () => import('@/modules/MateriaPrima/views/MateriaPrimaView.vue')
    }
  ]
}
