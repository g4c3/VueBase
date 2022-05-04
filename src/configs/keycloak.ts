import { KeycloakInitOptions } from 'keycloak-js';
import { KeycloakProjectConfigs } from '@/interfaces/intefaces';

export const keycloakConfigs: KeycloakProjectConfigs = {
    url: 'http://localhost:8080/auth/',
    realm: 'Gifts',
    clientId: 'mirenaET',
    'public-client': true,
    'verify-token-audience': false
}

export const keycloakInitOptions: KeycloakInitOptions = {    
    enableLogging: false,
    checkLoginIframe: true,
    onLoad: 'check-sso'
}

