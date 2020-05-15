import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";

Vue.use(Vuex);

axios.defaults.baseURL = "https://pacific-temple-40055.herokuapp.com";
// axios.defaults.baseURL = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    count: 0,
    products: [],
    myProducts: []
  },
  mutations: {
    increment(state) {
      state.count += 1;
    }
  },
  actions: {
    createProduct({ commit, state }, payload) {
      axios({
        method: "post",
        url: "/products",
        headers: { access_token: localStorage.getItem("access_token") },
        data: payload
      })
        .then(response => {
          state.products.push(response.data);
          alertify.success("Create successfully");
        })
        .catch(err => {
          alertify.error(err.response.data.message);
        });
    },
    findAllProduct({ commit, state }) {
      axios({
        method: "get",
        url: "/products",
        headers: { access_token: localStorage.getItem("access_token") }
      })
        .then(response => {
          state.products = response.data;
        })
        .catch(err => {
          alertify.error(err.response.data.message);
        });
    },
    findMyProduct({ commit, state }) {
      axios({
        method: "get",
        url: "/products/user",
        headers: { access_token: localStorage.getItem("access_token") }
      })
        .then(response => {
          state.myProducts = response.data;
        })
        .catch(err => {
          alertify.error(err.response.data.message);
        });
    },
    updateProduct({ commit, state }, data) {
      const id = data.id;
      const payload = data.payload;
      const index = data.index;
      // console.log('id di store' + id)
      axios({
        method: "put",
        url: `/products/${id}`,
        headers: { access_token: localStorage.getItem("access_token") },
        data: payload
      })
        .then(response => {
          Object.assign(state.products[index], response.data);
          alertify.success("Update successfully");
        })
        .catch(err => {
          alertify.error(err.response.data.message);
        });
    },
    deleteProduct({ commit, state }, data) {
      const id = data.id;
      const index = data.index;
      axios({
        method: "delete",
        url: `/products/${id}`,
        headers: { access_token: localStorage.getItem("access_token") }
      })
        .then(response => {
          state.products.splice(index, 1);
          alertify.success("delete successfully");
        })
        .catch(err => {
          alertify.error(err.response.data.message);
        });
    }
  },
  modules: {}
});
