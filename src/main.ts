import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import createVueRouter from './modules/router';
import _ from './modules/lodash/lodashLoader';
import store from './modules/store';
import i18n from '@/modules/i18n/i18n';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import luxonLoader from './modules/luxon/luxonLoader';
import Keycloak, { KeycloakInstance } from "keycloak-js";
import { keycloakOptions } from './configs/keycloak';

const keycloak = Keycloak(keycloakOptions)
const app = createApp(App)

keycloak.init({
    enableLogging: true,
    checkLoginIframe: false,
}).then(
    async (auth) => {
        app.config.globalProperties.$keycloak = keycloak
        app.use(store)
        app.use(createVueRouter.install(app))    
        app.use(_.install)
        app.use(i18n)
        app.use(VueAxios, axios)
        app.use(VueSvgInlinePlugin)
        app.use(luxonLoader)
        app.mount('#app')
        if(keycloak.token)
        {
            window.localStorage.setItem('keycloakToken', keycloak.token)
        }

    if(auth) {
        setInterval(() => {
            keycloak.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    console.log('Token not refreshed')
                } else {
                    console.log('Token not refreshed, valid for ' + keycloak.tokenParsed?.exp  + ' seconds');
                }
            }).catch((e) => {
                console.log('Update failed ' + e);
            });
        }, 6000)
    }
}).catch((e) => {
    console.log('Authenticated Failed', e);
})

//TODO: keycloak.onAuthLogout

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
      $keycloak: KeycloakInstance;
    }
}