export default {
  name: 'calculadora',
  component: () => import('@/modules/Calculadora/layouts/CalculadoraLayout.vue'),
  children: [
    {
      path: '/calculadora',
      name: 'calculadora',
      component: () => import('@/modules/Calculadora/views/CalculadoraView.vue')
    }
  ]
}