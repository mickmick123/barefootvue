import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SignIn from "../views/Login/Login.vue";
import Account from "../views/Account/Account.vue";
import Home from '../views/Home.vue'
import { TokenService } from "@/services/token.service";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      public: false,
      onlyWhenLoggedOut: false
    }
  },
  {
    path: '/login',
    component: SignIn,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
      record => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: "/home",
      query: { redirect: to.fullPath }
    });
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next("/account");
  }

  next();
});

export default router
