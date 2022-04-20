import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import createVueRouter from './plugins/router/index';
import _ from './modules/lodash/lodashLoader';
import { store } from './plugins/store';
import i18n from '@/modules/i18n/i18n';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import luxonLoader from './modules/luxon/luxonLoader';
import Keycloak, { KeycloakInstance } from "keycloak-js";
import { keycloakOptions } from './configs/keycloak';
import { IUser } from './interfaces/intefaces';
import { Role } from './roles/roles';

const keycloak = Keycloak(keycloakOptions);
const app = createApp(App);

keycloak.init({
    enableLogging: true,
    checkLoginIframe: true,
    onLoad: 'check-sso'
}).then(
    async (auth) => {
        app.config.globalProperties.$keycloak = keycloak;
        const router = createVueRouter(app, store);  
        app.use(store)
        app.use(router)    
        app.use(_)
        app.use(i18n)
        app.use(VueAxios, axios)
        app.use(VueSvgInlinePlugin)
        app.use(luxonLoader)
        app.mount('#app')
        if(keycloak.token)
        {     
            setUserData();
        }
    if(auth) {
        updateToken()
    }
    if(!auth){
        console.log('not auth')
    }
}).catch((e) => {
    console.log('Authenticated Failed', e);
})


declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
      $keycloak: KeycloakInstance;
    }
}

async function setUserData() {
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

function updateToken(){
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
