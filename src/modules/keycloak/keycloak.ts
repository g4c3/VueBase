import Keycloak, { KeycloakInstance } from "keycloak-js"
import { App } from 'vue';

const keycloakOptions = {
    url: 'http://localhost:8080/auth/',
    realm: 'Gifts',
    clientId: 'mirenaET',
    'public-client': true,
    'verify-token-audience': false
}

const keycloak = Keycloak(keycloakOptions)
keycloak.init({
  onLoad: 'login-required', 
  enableLogging: true,
  checkLoginIframe: true,
}).then((auth) => {
    if (!auth) {
      window.location.reload();
    } else 
    {
      if (keycloak.token) {
        // console.log(keycloak.authenticated);
        // console.log(auth);
        window.localStorage.setItem('keycloakToken', keycloak.token)
      }
    }  
  
    //Token Refresh
    setInterval(() => {
      keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
            // console.log('Token refreshed' + refreshed);
        } else {
            // console.log('Token not refreshed, valid for ' + keycloak.tokenParsed?.exp  + ' seconds');
        }
      }).catch(() => {
        // console.log('Failed to refresh token');
      });
    }, 6000)
  
  }).catch(() => {
    // console.log("Authenticated Failed");
})

export const isAuthenticated = keycloak.authenticated;

export default{
    install:(app: App) => {
        function load(): KeycloakInstance{
            return keycloak
        }
        app.config.globalProperties.$keycloak = load();
    }
};

declare module "@vue/runtime-core" {
    //Bind to `this` keyword
    interface ComponentCustomProperties {
      $keycloak: KeycloakInstance;
    }
}