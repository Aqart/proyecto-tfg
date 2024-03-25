import { createStore } from 'vuex'

import Auth from '@/modules/Auth/store'

const store = createStore({
  modules: {
    Auth
  }
})

export default store
