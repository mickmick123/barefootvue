import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import {store} from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component:  () => import("@/views/Home.vue"),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import("@/views/Account/Account.vue"),
    meta: {
      public: false,
      onlyWhenLoggedOut: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/Login/Login.vue"),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/posting',
    name: 'posting',
    component: () => import("@/views/Events/Posting.vue"),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (store.getters['auth/user'] &&  (to.name === 'login' || to.name === 'home')) {
    next({name : 'account', replace : true})
  }else if (!store.getters['auth/user'] && (to.name !== 'login' && to.name !== 'home')) {
    next({name : 'home', replace : true})
  }  else {
    next()
  }
});
export default router
