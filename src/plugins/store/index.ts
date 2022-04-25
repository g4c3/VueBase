import { createStore, Module, ActionContext, Store } from 'vuex';
import { IAuthorization, IUser, IRootState, IAppControl } from '../../interfaces/intefaces';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
import { Themes } from '../vuetify/themes';

const ls = new SecureLS({ isCompression: false });

export const authorization: Module<IAuthorization, IRootState> = {
  namespaced: true,
  state: {    
    isAuthenticated: false,
    user: {
      loginRoles: null,
      emailAddress: null,
      name: null,
      token: null,
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    getRole(state) {
      return state.user.loginRoles;
    },
    getUserEmailAddress(state) {
      return state.user.emailAddress;
    },
    getUserName(state) {
      return state.user.name;
    },
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    INITIATE_LOGIN(state, payload: IUser) {
      state.isAuthenticated = true,
      state.user.name = payload.name,
      state.user.emailAddress = payload.emailAddress,
      state.user.loginRoles = payload.loginRoles,
      state.user.token = payload.token
    },
    INITIATE_LOGOUT(state) {
      state.isAuthenticated = false,
      state.user.name = '',
      state.user.emailAddress = '',
      state.user.loginRoles = null,
      state.user.token = ''
    }
  },
  actions: {
    login({ commit }: ActionContext<IAuthorization, IRootState>, payload: IUser): void {
      commit('INITIATE_LOGIN', payload);
    },
    logout({ commit }: ActionContext<IAuthorization, IRootState>): void {
      commit('INITIATE_LOGOUT');
    }
  }
}

export const appManagement: Module<IAppControl, IRootState> = {
  namespaced: true,
  state: {    
    theme: null
  },
  getters: {
    getUserTheme(state) {
      return state.theme === null ? Themes.Light : state.theme;
    }
  },
  mutations: {
    TOGGLE_THEME(state) {
      state.theme === Themes.Light ? state.theme = Themes.Dark : state.theme = Themes.Light
    }
  }
}

const vuexLocal = createPersistedState<IRootState>(
  {
    paths: ['authorization', 'appManagement'],
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    }
});

export const store = createStore<IRootState>({
  modules: {
    authorization,
    appManagement
  },  
  plugins: [vuexLocal],
  strict: true
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<IRootState>
  }
}
