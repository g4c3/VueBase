import Keycloak, { KeycloakInstance } from 'keycloak-js'
import { devtoolsPlugin } from './devtools'
import { options as config} from '@/options/index'

function isFunction (value) {
  return typeof value === 'function'
}

function init (options) {
  const keycloak = Keycloak(config.keycloakOptions)

  keycloak.onReady = function () {
    isFunction(options.onReady) && options.onReady(keycloak)
  }

  keycloak.onAuthSuccess = function () {
    isFunction(options.onAuthSuccess) && options.onAuthSuccess(keycloak)
  }

  keycloak.onAuthError = function () {
    isFunction(options.onAuthError) && options.onAuthError(keycloak)
  }

  keycloak.onAuthRefreshSuccess = function () {
    isFunction(options.onAuthRefreshSuccess) && options.onAuthRefreshSuccess(keycloak)
  }

  keycloak.onAuthRefreshError = function () {
    isFunction(options.onAuthRefreshError) && options.onAuthRefreshError(keycloak)
  }

  keycloak.onAuthLogout = function () {
    isFunction(options.onAuthLogout) && options.onAuthLogout(keycloak)
  }

  keycloak.onTokenExpired = function () {
    isFunction(options.onTokenExpired) && options.onTokenExpired(keycloak)
  }

  keycloak
    .init(options.init)
    .then((authenticated) => {
      isFunction(options.onInitSuccess) &&
        options.onInitSuccess(authenticated)
    })
    .catch((error) => {
      isFunction(options.onInitError)
        ? options.onInitError(error)
        : console.error(error)
    })

  return keycloak
}

// let installed = false

export const Vuecloak = {
  install: (app, options) => {
    // if (installed) return

    // installed = true
    const keycloak = init(options)

    app.config.globalProperties.$keycloak = keycloak

    const IS_DEV = process.env.NODE_ENV === 'development'
    const IS_CLIENT = typeof window !== 'undefined'

    if (IS_DEV && IS_CLIENT) {
      devtoolsPlugin(app, keycloak)
    }
  }
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
      $keycloak: KeycloakInstance;
    }
}