import { createStore } from 'vuex'

import Auth from '@/modules/Auth/store'
import Consumible from '@/modules/Consumible/store'

const store = createStore({
  modules: {
    Auth,
    Consumible
  }
})

export default store
