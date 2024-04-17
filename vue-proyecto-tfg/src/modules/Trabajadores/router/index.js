export default {
  name: 'trabajadores',
  component: () => import('@/modules/Trabajadores/layouts/TrabajadoresLayout.vue'),
  children: [
    {
      path: '/trabajadores',
      name: 'list-trabajadores',
      component: () => import('@/modules/Trabajadores/views/TrabajadoresView.vue')
    },
    {
      path: '/trabajadores/add',
      name: 'add-trabajador',
      component: () => import('@/modules/Trabajadores/views/TrabajadoresView.vue')
    },
    {
      path: '/trabajadoress/edit/:id',
      name: 'edit-trabajadores',
      component: () => import('@/modules/Trabajadores/views/TrabajadoresView.vue')
    }
  ]
}
