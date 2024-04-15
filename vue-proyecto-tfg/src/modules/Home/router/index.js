import ConsumiblesRouter from '@/modules/Consumible/router'
import GastosGeneralesRouter from '@/modules/GastosGenerales/router'
import MaquinasRouter from '@/modules/Maquinas/router'
import CalculadoraRouter from '@/modules/Calculadora/router'


export default {
  name: 'home',
  component: () =>
    import(/* webpackChunkName: "HomeComponent" */ '@/modules/Home/layouts/HomeLayout.vue'),
  children: [
    {
      path: '/consumibles',
      ...ConsumiblesRouter
    },
    {
      path: '/gastos-generales',
      ...GastosGeneralesRouter
    },
    {
      path: '/maquinas',
      ...MaquinasRouter
    },
    {
      path: '/calculadora',
      ...CalculadoraRouter
    }
  ]
}
