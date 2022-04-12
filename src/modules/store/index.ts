import { createStore, Module, ActionContext, Store } from 'vuex';
import { IAuthorization, IUser, IRootState } from '../../interfaces/inteffaces';

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
    }
  },
  mutations: {
    INITIATE_LOGIN(state, payload: IUser){
      state.isAuthenticated = true,
      state.user.name = payload.name,
      state.user.emailAddress = payload.emailAddress,
      state.user.loginRoles = payload.loginRoles,
      state.user.token = payload.token
    },
    INITIATE_LOGOUT(state){
      state.isAuthenticated = false,
      state.user.name = '',
      state.user.emailAddress = '',
      state.user.loginRoles = null,
      state.user.token = ''
    },
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

export const store = createStore<IRootState>({
  modules: {
    authorization
  }
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<IRootState>
  }
}
