import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },

  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/Logout.vue')
  },
  
  {
    path: '/signup/merchant',
    name: 'signupmerchant',
    component: () => import('../views/MerchantSignup.vue')
  },

  {
    path: '/login/merchant',
    name: 'loginmerchant',
    component: () => import('../views/MerchantLogin.vue')
  },

  {
    path: '/merchant/dashboard',
    name: 'merchantdashboard',
    redirect: {name: 'overview'},
    component: () => import('../views/MerchantDashboard.vue'),
    meta: {
      requiresAuth: true,
    },
    
    children: [
      {
        path: 'overview',
        name: 'overview',
        components:{
          default: () => import('../views/Merchant/Overview.vue'),
        }
      },
      
      {
        path: 'orders',
        name: 'orders',
        components:{
          default: () => import('../views/Merchant/Orders.vue'),
        }
      },

      {
        path: 'shops',
        name: 'shops',
        components:{
          default: () => import('../views/Merchant/Shops.vue'),
        }
      },

      {
        path: 'shop/add',
        name: 'add_shop',
        components:{
          default: () => import('../views/Merchant/AddShop.vue'),
        }
      },

      // {
      //   path: 'shop/categories',
      //   name: 'shop_categories',
      //   components:{
      //     default: () => import('../views/Merchant/ShopCategories.vue'),
      //   }
      // },

      // {
      //   path: 'shop/categories/add',
      //   name: 'add_shop_category',
      //   components:{
      //     default: () => import('../views/Merchant/AddCategory.vue'),
      //   }
      // },

      {
        path: 'profile',
        name: 'profile',
        components:{
          default: () => import('../views/Merchant/Profile.vue'),
        }
      },

      {
        path: 'settings',
        name: 'settings',
        components:{
          default: () => import('../views/Merchant/Settings.vue'),
        }
      },

      {
        path: 'shop/:slug',
        name: 'shop_detail',
        components:{
          default: () => import('../views/Merchant/ShopDetail.vue'),
        },
      },

      {
        path: 'shop/:slug/add/product',
        name: 'add_product',
        components:{
          default: () => import('../views/Merchant/Shop/AddProduct.vue'),
        }
      }, 
    
    ]

  },

  {
    path: '/admin/earnings',
    name: 'earnings',
    component: () => import('../views/Admin/Earnings.vue')
  },
  
  {
    path: '/admin/transactions',
    name: 'transactions',
    component: () => import('../views/Admin/Transactions.vue')
  },

  {
    path: '/admin/orders',
    name: 'allorders',
    component: () => import('../views/Admin/Orders.vue')
  },

  {
    path: '/u/shop/:shopslug',
    name: 'shop',
    component: () => import('../views/Shop/Shop.vue')
  },
  
  {
    path: '/u/shop/:shopslug/checkout',
    name: 'checkout',
    component: () => import('../views/Shop/Checkout.vue')
  },

  {
    path: '/u/shop/:shopslug/checkout/success',
    name: 'success',
    component: () => import('../views/Shop/Success.vue')
  },

  {
    path: '/customer/orders/:email/:contact',
    name: 'customerorders',
    component: () => import('../views/Shop/Order.vue')
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




router.beforeEach((to, _from, next) => {
  const loggedIn = store.getters['auth/isLoggedIn'];

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (loggedIn) {
      next();
    } else {
      next('/login/merchant');
    }
  } else {
    next();
  }
});




// router.beforeEach((to, from, next) => {
//   const userPreventAccessIfLoggedIn = ['signupmerchant', 'loginmerchant']
//   const loggedIn = store.getters['auth/isLoggedIn'];
  
//   // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   // else next()
  

//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (loggedIn){
//       next()      
//     }else{
//       next('/login/merchant/')
//       return    
//     }

//   }

  

  // if(to.matched.some(record => record.meta.requiresAuth)) {
  //   if (loggedIn) {
  //     next()
  //     return
  //   }
  //   localStorage.setItem('loginContinue', to.fullPath)
  //   next('/login/merchant/')
  // } else if (userPreventAccessIfLoggedIn.includes(to.name) && loggedIn) {
  // // } else if ((to.name === "login" || to.name === "signup") && loggedIn) {
  //     return next({path: '/'})
  // }
  // else {
  //   next()
  // }
// })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
