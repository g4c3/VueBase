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
import { IUser } from './interfaces/intefaces';
import { Role } from './roles/roles';
import { Vuecloak } from '@/plugins/keycloak/keycloak';

const app = createApp(App);
const router = createVueRouter(app, store);  
app.use(store)
app.use(router)    
app.use(_)
app.use(i18n)
app.use(VueAxios, axios)
app.use(Vuecloak, {
    init: {
        enableLogging: true,
        checkLoginIframe: true,
        onLoad: 'check-sso'
    },
    onAuthSuccess() {
        const roles = app.config.globalProperties.$_
            .intersection(app.config.globalProperties.$keycloak.realmAccess?.roles, Object.values(Role));
        const userProfile = app.config.globalProperties.$keycloak.loadUserProfile();
        const user: IUser = {
        emailAddress: userProfile.email,
        loginRoles: roles,
        name: userProfile.firstName + ' ' + userProfile.lastName,
        token: app.config.globalProperties.$keycloak.token
        }
        app.config.globalProperties.$store.dispatch('authorization/login', user)
    },
    onAuthLogout() {
        app.config.globalProperties.$store.dispatch('authorization/logout')
        console.log("onAuthLogout")
    },
    onTokenExpired() {
        setInterval(() => {
            app.config.globalProperties.$keycloak.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    console.log('Token not refreshed')
                } else {
                    console.log('Token not refreshed, valid for ' + app.config.globalProperties.$keycloak.tokenParsed?.exp  + ' seconds');
                }
            }).catch((e) => {
                console.log('Update failed ' + e);
            });
        }, 6000)
    }
})
app.use(VueSvgInlinePlugin)
app.use(luxonLoader)
app.mount('#app')


axios.interceptors.request.use(async config => {
    await app.config.globalProperties.$keycloak.updateToken()
    
    config.headers!.Authorization = `Bearer ${app.config.globalProperties.$keycloak.token}`
    
    return config
})

// debugger;