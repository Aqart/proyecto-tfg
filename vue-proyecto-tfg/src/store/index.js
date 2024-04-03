import { createStore } from 'vuex'

import Auth from '@/modules/Auth/store'
import Consumible from '@/modules/Consumible/store'
import GastosGenerales from '@/modules/GastosGenerales/store'
import Shared from '@/modules/shared/store'

const store = createStore({
  modules: {
    Auth,
    Consumible,
    GastosGenerales,
    Shared
  }
})

export default store
