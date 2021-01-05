<template>
  <div id="nav" class="w3-contentx w3-padding w3-bar">


    <div>

        <router-link :to="{ name: 'home' }" class="">
            H O M E
        </router-link>

        <span class="w3-right">
            <span v-if="!isLoggedIn">
                <router-link :to="{ name: 'about' }" class="w3-bar-item">ABOUT</router-link>
                <router-link :to="{ name: 'loginmerchant' }" class="w3-bar-item item-nav w3-text-white w3-card">LOGIN / SIGNUP</router-link>
            </span>

            <span v-else>
                <router-link :to="{ name: 'profile' }" class="w3-bar-item">
                    Welcome, {{user.first_name}}
                </router-link>
                <router-link :to="{ name: 'logout' }" class="w3-bar-item item-nav w3-text-white w3-card">Logout</router-link>
            </span>

        </span>

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
  background-color: #4A61DD;
  color: #fff;
  margin: 0 3px 0 3px;
  border-radius: 5px;
}

#nav {
  /* padding: 15px; */
  color: white;
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
