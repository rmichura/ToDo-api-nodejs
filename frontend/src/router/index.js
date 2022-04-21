import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register'
import SignIn from "../views/SignIn";
import TheMain from "@/views/Home";
import Profile from "@/views/Profile";
import Dashboard from "@/views/Dashboard";

import store from "@/store";

Vue.use(VueRouter)

store.dispatch('autoLogin')

const authGuard = (to, from, next) => {
  if (store.getters.isAuth) {
    next();
  } else {
    next({name: 'login'});
  }
}

const notAuthGuard = (to, from, next) => {
  if (!store.getters.isAuth) {
    next();
  } else {
    next({name: 'profile'});
  }
}

const routes = [
  {
    path: '/',
    name: 'TheMain',
    component: TheMain
  },
  {
    path: '/login',
    name: 'Login',
    component: SignIn,
    beforeEnter: notAuthGuard
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: notAuthGuard
  },
  {
    path: '/user/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: authGuard
  },
  {
    path: '/user/todo',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: authGuard
  }
  // {
  //   // path: '/about',
  //   // name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

if (store.getters.isAuth) {
  const expirationDate = new Date(localStorage.getItem('expires'));
  const now = new Date();

  if (expirationDate <= now) {
    store.dispatch('logout');
  } else {
    setTimeout(() => {
      store.dispatch('logout');
    }, expirationDate.getTime() - now.getTime());
  }
}
