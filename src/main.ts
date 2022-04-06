import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import _ from './plugins/lodash/lodashLoader'
import store from './store'
import luxon from './plugins/luxon/luxonLoader'
import i18n from '@/plugins/i18n/i18n';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSvgInlinePlugin from "vue-svg-inline-plugin";

createApp(App)
    .use(store)
    .use(router)    
    .use(_)
    .use(luxon)
    .use(i18n)
    .use(VueAxios, axios)
    .use(VueSvgInlinePlugin)
    .mount('#app')
