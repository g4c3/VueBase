import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { App } from 'vue';
import { KeycloakInstance } from 'keycloak-js';

const createRoutes = (app: App) => {
  const keycloak: KeycloakInstance = app.config.globalProperties.$keycloak;
  const preventRoutes = {
    beforeEnter(to, from, next) {
      if(to.meta.requiresAuth){
        if (keycloak.authenticated) {
          next();
        } else {
          const redirectUrl = `${window.location.origin}/${to.path}`
          keycloak.login({redirectUri: redirectUrl})
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
        requiresAuth: true
      },
      component: () => import('@/components/WellcomeView.vue'),
      ...preventRoutes
    }
  ] as Array<RouteRecordRaw>;
}

export default {
  install:(app: App): Router => {
    function create(): Router {
      const router = createRouter({
        history: createWebHistory(),
        routes: createRoutes(app)
      });
      return router;
    }
    return create(); 
  }
}
