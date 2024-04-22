import ConsumiblesRouter from '@/modules/Consumible/router'
import GastosEnergeticosRouter from '@/modules/GastosEnergeticos/router'
import MaquinasRouter from '@/modules/Maquinas/router'
import CalculadoraRouter from '@/modules/Calculadora/router'
import TransportesRouter from '@/modules/Transportes/router'
import TrabajadoresRouter from '@/modules/Trabajadores/router'
import UsuariosRouter from '@/modules/Usuarios/router'
import ControlesHorariosRouter from '@/modules/ControlesHorarios/router'

export default {
  name: 'home',
  component: () =>
    import(/* webpackChunkName: "HomeComponent" */ '@/modules/Home/layouts/HomeLayout.vue'),
  children: [
    {
      path: '/consumibles',
      ...ConsumiblesRouter,
      meta: { requiresRole: 'ADMIN' }
    },
    {
      path: '/gastos-energeticos',
      ...GastosEnergeticosRouter
    },
    {
      path: '/maquinas',
      ...MaquinasRouter
    },
    {
      path: '/calculadora',
      ...CalculadoraRouter
    },
    {
      path: '/Transportes',
      ...TransportesRouter
    },
    {
      path: '/trabajadores',
      ...TrabajadoresRouter
    },
    {
      path: '/usuarios',
      ...UsuariosRouter
    },
    {
      path: '/controles-horarios',
      ...ControlesHorariosRouter
    }
  ]
}
