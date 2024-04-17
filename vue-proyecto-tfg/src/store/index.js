import { createStore } from 'vuex'

import Auth from '@/modules/Auth/store'
import Consumible from '@/modules/Consumible/store'
import GastosGenerales from '@/modules/GastosGenerales/store'
import Shared from '@/modules/shared/store'
import Maquinas from '@/modules/Maquinas/store'
import Transportes from '@/modules/Transportes/store'
import Trabajadores from '@/modules/Trabajadores/store'

const store = createStore({
  modules: {
    Auth,
    Consumible,
    GastosGenerales,
    Shared,
    Maquinas,
    Transportes,
    Trabajadores
  }
})

export default store
