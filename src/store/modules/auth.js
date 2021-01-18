import axios from "axios";
import router from '@/router'
import store from '@/store'

import { addToLocalStorageArray, addToLocalStorageObject, updateLocalStorageArray, removeLocalStorageTokens } from '@/store/helper'
import { operatorValues } from '@/utils/utils'

const state = {
    token: localStorage.getItem('token') || '',
    refresh: localStorage.getItem('refresh') || '',
    user: JSON.parse(localStorage.getItem('user')) || '',

    base_url: process.env.VUE_APP_BASE_URL,

    authError: {
      merchantLoginError:null,
      merchantSignupError: null,
      customerSignupError: null
    },
    countries: [],

    sidebarStatus: ""
};

const getters = {
    isLoggedIn: state => !!state.token,
    user: state => state.user || '',
};

const actions = {

  // Login Merchant Action
  loginMerchant ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: "auth/token/",
        data: userInfo,
      }).then(response => {
          const token = response.data.access
          const refresh = response.data.refresh
          const user = response.data.profile
          
          const payload = {
            token,
            refresh,
            user
          }
          const loginContinue = localStorage.getItem('loginContinue')

          localStorage.setItem('token', token)
          localStorage.setItem('refresh', refresh)
          localStorage.setItem('user', JSON.stringify(user))

          axios.defaults.headers.common['Authorization'] = 'Bearer '+token
          commit('auth_success', payload)

          store.dispatch('shops/fetchShops', user.id)

          if (loginContinue){ router.push(loginContinue) }
          router.push({name: 'merchantdashboard'})

          resolve(response);

        }, error => {
          const err_message = error.response.data.detail
          commit('merchant_login_auth_error', err_message)
          removeLocalStorageTokens()
          reject(error);
        })
    })

  },

  // Signup Merchant Action
  signupMerchant ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      axios.post(
        "auth/signup/merchant/", userInfo
      ).then(response => {
          const token = response.data.access
          const refresh = response.data.refresh
          const user = response.data.profile
          
          const payload = {
            token,
            refresh,
            user
          }

          const loginContinue = localStorage.getItem('loginContinue')
          
          localStorage.setItem('token', token)
          localStorage.setItem('refresh', refresh)
          localStorage.setItem('user', JSON.stringify(user))

          axios.defaults.headers.common['Authorization'] = 'Bearer '+token
          commit('auth_success', payload)

          store.dispatch('shops/fetchShops', user.id)

          if (loginContinue){ router.push(loginContinue) }

          router.push({name: 'merchantdashboard'})
          resolve(response);  // Let the calling function know that http is done. You may send some data back

        }, error => {
          const err_message = operatorValues(error.response.data)
          commit('merchant_signup_auth_error', err_message)
          removeLocalStorageTokens()
          reject(error);

        })
    })
  },

  // Update Password
  updatePassword ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      axios.put(
        "auth/password/update/", userInfo
      ).then(response => {          
          resolve(response);
        }, error => {
          reject(error);
        })
    })
  },

  // Update Profile
  updateProfile ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      axios.put(
        `auth/profile/${userInfo.id}`, userInfo.data
      ).then(response => {          
          resolve(response);
        }, error => {
          reject(error);
        })
    })
  },


  async refreshToken ({ commit }, token) {
    commit('auth_refresh_success', {token})
  },
  

  async fetchCountries ({ commit }) {
    const response = await axios({
      method: 'GET',
      url: "countries/",
    }).then(response => {
        commit('get_countries', response.data)
    }).catch(error => {

    })
  },

  logout({commit}){
    return new Promise((resolve, reject) => {
      commit('initiate_logout')
      resolve()
    })
  },


};

const mutations = {
  get_countries(state, data){
    state.countries = data
  },

  auth_success(state, payload){
    state.authError['merchantLoginError'] = null
    state.authError['merchantSignupError'] = null
    state.token = payload['token']
    state.refresh = payload['refresh']
    state.user = payload['user']
  },

  merchant_login_auth_error(state, data){
    state.authError['merchantLoginError'] = data
  },

  merchant_signup_auth_error(state, data){
    state.authError['merchantSignupError'] = data
  },

  auth_refresh_success(state, payload){
    state.token = payload['token']
  },

  initiate_logout(state, payload){
    state.user = {}
    state.refresh = ''
    state.token = ''

    setTimeout(function(){
      localStorage.removeItem('vuex')
      
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
      localStorage.removeItem('refresh')
      localStorage.removeItem('user')
      localStorage.clear()
      router.push({name: 'loginmerchant'})
    }, 10);

  },

  toggleSidebarStatus(state, data){
    state.sidebarStatus = data
  },


  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
