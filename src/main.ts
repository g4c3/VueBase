import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import createVueRouter from './modules/router/index';
import _ from './modules/lodash/lodashLoader';
import { store } from './modules/store';
import i18n from '@/modules/i18n/i18n';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import luxonLoader from './modules/luxon/luxonLoader';
import Keycloak, { KeycloakInstance } from "keycloak-js";
import { keycloakOptions } from './configs/keycloak';
import { IUser } from './interfaces/inteffaces';
import { Role } from './roles/roles';
//TODO: check if keycloak is running

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
        app.use(_)
        app.use(i18n)
        app.use(VueAxios, axios)
        app.use(VueSvgInlinePlugin)
        app.use(luxonLoader)
        app.mount('#app')
        if(keycloak.token)
        {            
            const roles = app.config.globalProperties.$_
                .intersection(keycloak.realmAccess?.roles, Object.values(Role));
            const userProfile = await keycloak.loadUserProfile();
            const user: IUser = {
                emailAddress: userProfile.email,
                loginRoles: roles,
                name: userProfile.firstName + ' ' + userProfile.lastName,
                token: keycloak.token
            }
            app.config.globalProperties.$store.dispatch('authorization/login', user)
        }
    if(auth) {
        setInterval(() => {
            keycloak.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    // console.log('Token not refreshed')
                } else {
                    // console.log('Token not refreshed, valid for ' + keycloak.tokenParsed?.exp  + ' seconds');
                }
            }).catch((e) => {
                console.log('Update failed ' + e);
            });
        }, 60000000000)
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
