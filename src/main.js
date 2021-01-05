import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/utils/axios';
import VueAxios from 'vue-axios'
// import VeeValidate from "vee-validate";
import contenteditable from 'vue-contenteditable'
import 'w3-css/w3.css'
import Flutterwave from 'vue-flutterwave'
 
Vue.use(Flutterwave, { publicKey: 'FLWPUBK_TEST-6cbece25a898743b4604bcee583de09b-X' })

Vue.use(VueAxios, axios)
Vue.use(contenteditable)

Vue.prototype.$log = console.log;

// FONT-AWESOME START
// Inject font-awesome start
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import { dom } from '@fortawesome/fontawesome-svg-core'
dom.watch()
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
// Inject font-awesome end
// FONT-AWESOME END____________________________________


// VEE-VALIDATION START
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
// VEE-VALIDATION END____________________________________


// ALERT TOAST START
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.css';
// import 'izitoast/dist/css/iziToast.min.css';
Vue.use(VueIziToast);
// ALERT TOAST END____________________________________

import moment from 'moment'
Vue.prototype.moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
