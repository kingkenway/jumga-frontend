<template>
  <div id="nav" class="w3-contentx w3-bar w3-margin-bottom">

      <div class="">
        <router-link :to="{ name: 'home' }" class="w3-bar-item">
            J . U . M . G . A
        </router-link>
      </div>

      <div class="w3-right">
          <div class="w3-right-align" v-if="!isLoggedIn">
              <!-- <router-link :to="{ name: 'about' }" class="w3-bar-item">ABOUT</router-link> -->
              <router-link :to="{ name: 'loginmerchant' }" class="w3-bar-item">LOGIN</router-link>
              <router-link :to="{ name: 'signupmerchant' }" class="w3-bar-item item-nav w3-text-white w3-card">SIGNUP</router-link>
          </div>

          <div class="w3-right-align" v-else>
              <router-link :to="{ name: 'profile' }" class="w3-bar-item">
                  Hi, {{user.first_name}}
              </router-link>
              <router-link :to="{ name: 'logout' }" class="w3-bar-item item-nav w3-text-white w3-card">Logout</router-link>
          </div>

      </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import router from '@/router'

export default {
  name: 'Navbar',

  computed: mapGetters('auth', ['user', 'isLoggedIn']),
}

</script>

<style>
.item-nav{
  background-color: #1d4476cb;
  color: #fff;
  margin: 0 3px 0 3px;
  border-radius: 5px;
}

#nav {
  /* padding: 15px; */
  color: white;
  margin-top: 30px;
  /* background-color: #827ffe; */
}

#nav a {
  /* padding: 15px; */
  font-weight: bold;
  /* color: #2c3e50; */
  text-decoration: none;
}

/* #nav a:hover {
  border-bottom: 1px solid #ccc;
} */

#nav a.router-link-exact-active {
  /* text-decoration: underline; */
  /* color: #827ffe; */
}

/*Filter styles*/
.saturate { filter: saturate(3); }
.grayscale { filter: grayscale(100%); }
.contrast { filter: contrast(160%); }
.brightness { filter: brightness(0.25); }
.blur { filter: blur(3px); }
.invert { filter: invert(100%); }
.sepia { filter: sepia(100%); }
.huerotate { filter: hue-rotate(180deg); }
.rss.opacity { filter: opacity(50%); }
</style>
