import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import * as keycloakObject from '@/services/keycloak'

const keycloak = keycloakObject;

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: '/wellcome',
    name: 'wellcome',
    component: () => import('@/components/WellcomeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(keycloak)
  // console.log(keycloak.kcInstance.token)
  
  next()
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   console.log(to.name)
  //   if (keycloak.kcInstance.authenticated) {
  //     next()
  //   } else {
  //     const loginUrl = keycloak.kcInstance.createLoginUrl()
  //     window.location.replace(loginUrl)
  //   }
  // } else {
  //   next()
  // }
})

router.afterEach((to, from, next) => {
  console.log(keycloak)
  // console.log(keycloak.kcInstance.token)
  // alert(keycloak.isAuth.value.value)
})

// router.beforeEach((to, from, next) => {
// if(to.matched.some(record => record.meta.requiresAuth)){
//   // let is = this.$keycloak.authenticated
//   // if(this.$keycloak.)
// }
  
  // // TODO: check login state from store
  // const isLoggedIn = !!sessionStorage.getItem('loginRole')

  // if(to.meta.disallowAuth && isLoggedIn) {

  //     // if user came from router-link
  //     if (from.name) return next(false);

  //     // if user navigated the site manually / from outside
  //     return next({ name: 'ContractorData' });
  // }
  // return next();
// });
export default router
