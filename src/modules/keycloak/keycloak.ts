import { vueKeycloak } from "@baloise/vue-keycloak";
import { App } from 'vue';

export default{
    setup(app: App) {
        app.use(vueKeycloak, {            
            initOptions: {
                flow: 'standard',
                checkLoginIframe: false,
                onLoad: 'login-required',    
                'public-client': true,
                'verify-token-audience': false
            },
            config: {
                url: 'http://localhost:8080/auth/',
                realm: 'Gifts',
                clientId: 'mirenaET',
            }            
        })        
    }
}
