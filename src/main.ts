import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './modules/router'
import _ from './modules/lodash/lodashLoader'
import store from './modules/store'
import i18n from '@/modules/i18n/i18n';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import luxonLoader from './modules/luxon/luxonLoader'
import keycloak from './modules/keycloak/keycloak'

// const app = createApp(App, { 
//     render(){ return h(App, reactive({keycloak})) } 
// })
const app = createApp(App)
    .use(store)
    .use(router)    
    .use(_.install)
    .use(i18n)
    .use(VueAxios, axios)
    .use(VueSvgInlinePlugin)
    .use(keycloak.setup)
    .use(luxonLoader)
    .mount('#app')
 