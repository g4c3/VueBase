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
import Keycloak from "keycloak-js";
import { keycloakConfigs, keycloakInitOptions } from './configs/keycloak';
import { IUser } from './interfaces/intefaces';
import { Role } from './roles/roles';
import vuetify, { loadFontAwesome } from './plugins/vuetify/vuetify';
import { loadFonts } from './plugins/vuetify/webfontloader';

const keycloak = new Keycloak(keycloakConfigs);
const app = createApp(App);

(async () => {
    const fontAwesomeLoader = await loadFonts();
    return fontAwesomeLoader;
})()

loadFontAwesome(app);

keycloak.init(keycloakInitOptions).then(
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
        app.use(vuetify)
        app.mount('#app')     
    if(auth) {
        if(keycloak.token)
        {   
            updateToken();
            tokenInterceptor();     
            (async () => {
                const userData = await setUserData();
                return userData;
            })()
        }
    } else if(!auth) {
        const user: IUser = await getStoredUserState();
        if(user.emailAddress != null){
            app.config.globalProperties.$store.dispatch('authorization/logout')
        }       
    }
}).catch((e) => {
    console.log('Authenticated Failed', e);
})

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
      $keycloak: Keycloak;
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

function updateToken() {
    setInterval(() => {
        keycloak.updateToken(3600).then((refreshed) => {
            if (refreshed) {
                console.log('Token not refreshed')
            } else {
                console.log('Token not refreshed, valid for ' + keycloak.tokenParsed?.exp  + ' seconds');
            }
        }).catch((e) => {
            console.log('Update failed ' + e);
            console.log('Logging out ...')
            app.config.globalProperties.$store.dispatch('authorization/logout')
        });
    }, 3600000)
}

async function getStoredUserState() {
    const userData = await app.config.globalProperties.$store.getters['authorization/getUser'];
    return userData;
}

function tokenInterceptor() {
    axios.interceptors.request.use(config => {
        config.headers = {
            'Authorization': `Bearer ${app.config.globalProperties.$keycloak.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
    }, error => {
        return Promise.reject(error);
    })
}