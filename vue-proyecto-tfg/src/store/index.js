import { createStore } from 'vuex'

import Auth from '@/modules/Auth/store'
import Consumible from '@/modules/Consumible/store'
import GastosEnergeticos from '@/modules/GastosEnergeticos/store'
import GastosGenerales from '@/modules/GastosGenerales/store'
import Shared from '@/modules/shared/store'
import Maquinas from '@/modules/Maquinas/store'
import Transportes from '@/modules/Transportes/store'
import Trabajadores from '@/modules/Trabajadores/store'
import Usuarios from '@/modules/Usuarios/store'

const store = createStore({
  modules: {
    Auth,
    Consumible,
    GastosEnergeticos,
    GastosGenerales,
    Shared,
    Maquinas,
    Transportes,
    Trabajadores,
    Usuarios
  }
})

export default store
