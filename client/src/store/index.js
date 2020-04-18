import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'https://pacific-temple-40055.herokuapp.com';
export default new Vuex.Store({
  state: {
    count: 0,
    products: [],
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
  },
  actions: {
    signIn(context, payload) {
      axios({
        method: 'post',
        url: '/login',
        data: payload,
      })
      .then(response => {
        console.log(response.data)
        localStorage.setItem('access_token', response.data.access_token)
        router.push('/')
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    signUp({commit, state}, payload) {
      axios({
        method: 'post',
        url: '/register',
        data: payload,
      })
      .then(response => {
        console.log(response.data)
        router.push('/login')
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    createProduct({commit, state}, payload) {
      axios({
        method: 'post',
        url: '/products',
        headers: { access_token: localStorage.getItem('access_token') },
        data: payload,
      })
      .then(response => {
        console.log(response.data)
        state.products.push(response.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    findAllProduct({commit, state}) {
      axios({
        method: 'get',
        url: '/products',
        headers: {'access_token': localStorage.getItem('access_token')}
      })
      .then(response => {
        console.log('masuk find all')
        console.log(response)
        state.products = response.data
      })
      .catch(err => {
        console.log('masuk error')
        console.log(err.response)
      })
    },
    updateProduct({commit, state}, data) {
      const id = data.id
      const payload = data.payload
      // console.log('id di store' + id)
      axios({
        method: 'put',
        url: `/products/${id}`,
        headers: { 'access_token': localStorage.getItem('access_token') },
        data: payload,
      })
      .then(response => {
        console.log('keedit dari strore')
        console.log(response.data)
        Object.assign(state.products[index], payload)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    deleteProduct({commit, state}, id) {
      axios({
        method: 'delete',
        url: `/products/${id}`,
        headers: { 'access_token': localStorage.getItem('access_token') },
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  },
  modules: {
  },
});
