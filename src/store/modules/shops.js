import axios from "axios";
import router from '@/router'
import store from '@/store'
import { operatorValues } from '@/utils/utils'

const state = {
  current_shop: [],
  cart: [],
  customer: {},

  server_data: {},
  default_image: '@/assets/blank.png',
  
  shops: [],
  products: [],
};

const getters = {
    
};

const actions = {

  async fetchShops ({ commit }, id) {
    const response = await axios({
      method: 'GET',
      url: `merchant/shops/${id}/all/`,
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
          router.push({name: 'shop_detail', params: {slug: response.data['sub_domain']}})
          resolve(response)
        }, error => {
          reject(error)          
        })
    })
  },

  approveShop ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: "merchant/payment/",
        data: data,
      }).then(response => {
          const payload = {"data": response.data}
          commit('set_approved_shop', payload)
          resolve(response)
        }, error => {
          reject(error)
        })
    })

  },

  orderPayment ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: "merchant/payment/",
        data: data,
      }).then(response => {
          // const payload = {"data": response.data}
          // commit('set_approved_shop', payload)
          resolve(response)
        }, error => {
          reject(error)
        })
    })

  },

  addProduct ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: "merchant/shop/product/",
        data: data,
      }).then(response => {
          const payload = {"data": response.data}

          router.push({name: 'shop_detail', params: {slug: router.currentRoute.params.slug} })
          
          // commit('add_new_product', payload)
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },

  getSingleProduct ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `merchant/shop/product/${id}/`,
      }).then(response => {
          const payload = {"data": response.data}
          resolve(response)
          // commit('add_new_product', payload)
          // router.push({name: 'shop_detail', params: {slug: response.data['sub_domain']}})
        }, error => {
          reject(error)
        })
    })
  },
  
  getShopProducts ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `merchant/shop/products/${id}/all/`,
      }).then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },

  getAndShopProductsPublic ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `merchant/shop/products/${id}/all/public/`,
      }).then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },

  placeOrder ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: "merchant/order/",
        data: data,
      }).then(response => {
          commit('set_order', response.data)
          // router.push({name: 'shop_detail', params: {slug: response.data['sub_domain']}})
          resolve(response)
        }, error => {
          reject(error)          
        })
    })
  },

  customerOrders ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `customer/orders/${data.email}/${data.contact}/`,
        data: data,
      }).then(response => {
          // const payload = {"data": response.data}
          // commit('set_approved_shop', payload)
          resolve(response)
        }, error => {
          reject(error)
        })
    })

  },

  merchantOrders ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `merchant/allorders/${data}/`,
      }).then(response => {
          // const payload = {"data": response.data}
          // commit('set_approved_shop', payload)
          resolve(response)
        }, error => {
          reject(error)
        })
    })

  },

  merchantOverview ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `merchant/overview/${data}/`,
      }).then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })

  },

  getAllOrders ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `admin/allorders/`,
      }).then(response => {
          // const payload = {"data": response.data}
          // commit('set_approved_shop', payload)
          resolve(response)
        }, error => {
          reject(error)
        })
    })

  },

  getTransactions ({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: 'admin/transactions/',
      }).then(response => {
          // const payload = {"data": response.data}
          // commit('set_approved_shop', payload)
          resolve(response)
        }, error => {
          reject(error)
        })
    })

  },

};

const mutations = {
  set_current_shop(state, data){
    state.current_shop = data
  },

  push_to_cart(state, data){
    state.cart.push(data)
  },

  set_customer(state, data){
    state.customer = data
  },

  set_order(state, data){
    state.server_data = data
  },

  empty_cart(state, data){
    if (data){
      while (state.cart.length) {state.cart.pop()}
    }else{
      if (router.currentRoute.params.shopslug != state.current_shop.sub_domain){
        while (state.cart.length) {state.cart.pop()}
      }

    }

  },

  add_or_remove_quantity_to_cart(state, data){
    const cart_obj = state.cart.findIndex((obj => obj.id == data['id']))

    if (data['remove']){
      
      if(state.cart[cart_obj].quantity == 1){
        const res = state.cart.filter(item => item.id !== data['id'])
        state.cart = res
      }else{
        state.cart[cart_obj].quantity -= 1
      }

    }else{
      state.cart[cart_obj].quantity += 1
    }
  },

  set_shops(state, data){
    state.shops = data
  },

  set_new_shop(state, data){
    state.shops.unshift(data['data'])
  },

  set_approved_shop(state, data){
    const slug = router.currentRoute.params.slug
    const shopIndex = state.shops.findIndex((obj => obj.sub_domain == slug))
    state.shops[shopIndex].is_active = true
  },

  // add_new_product(state, data){
  //   // state.shops.unshift(data['data'])
  // },


  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
