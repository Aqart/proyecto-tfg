import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSortUp,
  faSortDown,
  faEnvelope,
  faLock,
  faRightToBracket,
  faRightFromBracket,
  faCircleUser,
  faCaretDown,
  faUserPlus,
  faPenToSquare,
  faTrashCan,
  faPlus,
  faSquareCheck,
  faHouse,
  faTriangleExclamation,
  faCircleExclamation,
  faFilePdf,
  faCircleInfo,
  faMap,
  faChevronRight,
  faRoute,
  faTrowelBricks,
  faTruck,
  faUsers,
  faBucket,
  faPersonDigging,
  faBolt,
  faOilWell,
  faListCheck,
  faCalculator,
  faDroplet
} from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faSortUp,
  faSortDown,
  faEnvelope,
  faLock,
  faRightToBracket,
  faRightFromBracket,
  faCircleUser,
  faCaretDown,
  faUserPlus,
  faPenToSquare,
  faTrashCan,
  faPlus,
  faSquareCheck,
  faHouse,
  faTriangleExclamation,
  faCircleExclamation,
  faFilePdf,
  faCircleInfo,
  faCircleQuestion,
  faMap,
  faChevronRight,
  faRoute,
  faTrowelBricks,
  faTruck,
  faUsers,
  faBucket,
  faPersonDigging,
  faBolt,
  faOilWell,
  faListCheck,
  faCalculator,
  faDroplet
)

createApp(App).component('FontAwesomeIcon', FontAwesomeIcon).use(store).use(router).mount('#app')
