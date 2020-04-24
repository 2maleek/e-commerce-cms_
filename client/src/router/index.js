import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import AllProduct from '../views/AllProduct.vue';
import MyProduct from '../views/MyProduct.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/products',
    name: 'AllProduct',
    component: AllProduct,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')){
        store.dispatch('findAllProduct')
        next()
      }
      else next({ name: 'Login' })
    }
  },
  {
    path: '/myproducts',
    name: 'MyProduct',
    component: MyProduct,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')){
        store.dispatch('findMyProduct')
        next()
      }
      else next({ name: 'Login' })
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')){
        store.dispatch('findAllProduct')
        next()
      }
      else next({ name: 'Login' })
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')){
        next({ name: 'Home'})
      }
      else next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')){
        store.dispatch('findAllProduct')
        next({ name: 'Home' })
      }
      else next()
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
