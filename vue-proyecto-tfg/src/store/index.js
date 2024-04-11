import { createStore } from 'vuex'

import Auth from '@/modules/Auth/store'
import Consumible from '@/modules/Consumible/store'
import GastosGenerales from '@/modules/GastosGenerales/store'
import Shared from '@/modules/shared/store'
import Maquinas from '@/modules/Maquinas/store'

const store = createStore({
  modules: {
    Auth,
    Consumible,
    GastosGenerales,
    Shared,
    Maquinas
  }
})

export default store
