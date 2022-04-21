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
import vuetify, { loadFontAwesome } from './plugins/vuetify/vuetify';
import { loadFonts } from './plugins/vuetify/webfontloader';


const keycloak = Keycloak(keycloakOptions);
const app = createApp(App);

(async () => {
    const fontAwesomeLoader = await loadFonts();
    return fontAwesomeLoader;
})()

loadFontAwesome(app);

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
        app.use(vuetify)
        app.mount('#app')

        // tokenInterceptor()
        if(keycloak.token)
        {            
            (async () => {
                const userData = await setUserData();
                return userData;
            })()
        }
    if(auth) {
        updateToken()
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
        });
    }, 3600000)
}


//TODO: Interceptors
// function tokenInterceptor() {
//     axios.interceptors.request.use(config => {
//       if (app.config.globalProperties.$keycloak.authenticated) {
//         config.headers!.Authorization = `Bearer ${app.config.globalProperties.$keycloak.token}`;
//       }
//       return config;
//     }, error => {
//       return Promise.reject(error);
//     })
// }
