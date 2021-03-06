import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import shops from './modules/shops'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    shops
  },
  plugins: [createPersistedState()]
})
