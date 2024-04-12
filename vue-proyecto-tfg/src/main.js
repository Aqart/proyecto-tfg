import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import Vuex from 'vuex'

// const app = createApp(App)

// app.use(state)
// app.use(router)

// app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSortUp, faSortDown)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
