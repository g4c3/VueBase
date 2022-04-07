import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import _ from './modules/lodash/lodashLoader'
import store from './store'
import i18n from '@/modules/i18n/i18n';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import keycloak from './modules/keycloak/keycloak'
import luxonLoader from './modules/luxon/luxonLoader'

const app = createApp(App)
    .use(store)
    .use(router)    
    .use(_.install)
    .use(i18n)
    .use(VueAxios, axios)
    .use(VueSvgInlinePlugin)
    .use(keycloak.install)
    .use(luxonLoader)
    .mount('#app')

    

// const app = createApp({
//     render: h => h(App)
// });