import axios from "axios";
import router from '@/router'
import store from '@/store'
import { operatorValues } from '@/utils/utils'

const state = {
    shops: []
};

const getters = {
    
};

const actions = {

  async fetchShops ({ commit }, id) {
    const response = await axios({
      method: 'GET',
      url: `merchant/shop/${id}/all/`,
    }).then(response => {
        commit('set_shops', response.data)
    }).catch(error => {

    })
  },

  addShop ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: "merchant/shop/",
        data: data,
      }).then(response => {
          const payload = {"data": response.data}
          commit('set_new_shop', payload)          
        }, error => {
          
        })
    })

  },


};

const mutations = {
  set_shops(state, data){
    state.shops = data
  },

  set_new_shop(state, data){
    state.shops.unshift(data['data'])

    console.log('from store');
    console.log(data['data']);
  },

  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
