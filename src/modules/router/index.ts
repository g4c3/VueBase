import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { App } from 'vue';

const createRoutes = (app: App) => {
  //TODO: finish the configurations logic
  const preventRoutes = {
    beforeEnter(to, from, next) {
      if(to.meta.requiresAuth){
        if (app.config.globalProperties.$keycloak.authenticated) {
          next();
        } else {
          next("/");
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
      component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
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
        // mode: RouterOptions.history,
        history: createWebHistory(),
        routes: createRoutes(app)
      });
      return router;
    }
    return create(); 
  }
}
