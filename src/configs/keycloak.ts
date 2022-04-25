export const keycloakOptions = {
    url: 'http://localhost:8080/auth/',
    realm: 'Gifts',
    clientId: 'mirenaET',
    'public-client': true,
    'verify-token-audience': false
}

export const keycloakInitOptions = {    
    enableLogging: true,
    checkLoginIframe: true,
    onLoad: 'check-sso'
}