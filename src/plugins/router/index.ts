import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { App } from 'vue';
import { KeycloakInstance } from 'keycloak-js';

const createRoutes = (app: App, store) => {
  const keycloak: KeycloakInstance = app.config.globalProperties.$keycloak;
  const preventRoutes = {
    beforeEnter(to, from, next) {
      if(to.meta.requiresAuth){
        if (store.getters['authorization/isAuthenticated']) {
          next();
        } else {
          const redirectUrl = `${window.location.origin}/${to.path}`
          keycloak
            .login({redirectUri: redirectUrl})          
        }
      } else if(!to.meta.requiresAuth) {
        next();
      }
    }
  };

  return [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: false
      },
      component: HomeView,
      ...preventRoutes
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/views/AboutView.vue'),   ///* webpackChunkName: "about" */ 
      ...preventRoutes
    },
    {
      path: '/wellcome',
      name: 'wellcome',
      meta: {
        requiresAuth: false
      },
      component: () => import('@/components/WellcomeView.vue'),
      ...preventRoutes
    },
    {
      path: '/impressum',
      name: 'Impressum',
      component: () => import('@/views/ImpressumView.vue'),
      meta: {
          requiresAuth: false,
      }
  },
  ] as Array<RouteRecordRaw>;
}

export default function router(app, store) {
  const router = createRouter({
    history: createWebHistory(),
    routes: createRoutes(app, store),
    // scrollBehavior(to, from, savedPosition) {
    //   return { left: 0, top: 160 };
    // },
  });
  return router;
}

