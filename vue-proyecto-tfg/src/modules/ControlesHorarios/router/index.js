export default {
  name: 'controles-horarios',
  component: () => import('@/modules/ControlesHorarios/layouts/ControlesHorariosLayout.vue'),
  children: [
    {
      path: '/controles-horarios',
      name: 'controles-horarios',
      component: () => import('@/modules/ControlesHorarios/views/ControlHorarioView.vue')
    }
  ]
}
