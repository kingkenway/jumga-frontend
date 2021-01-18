<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login/merchant">Merchant Login</router-link> |
      <router-link to="/signup/merchant">Merchant Signup</router-link> |
      <router-link to="/logout">Logout</router-link> -->

      <Navbar />
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import router from '@/router'
import Navbar from './components/Navbar.vue'


import NProgress from 'nprogress'

export default {

  methods: {
    ...mapActions('auth', ['fetchCountries']),
  },

  created: function () {
    this.fetchCountries()
  },

  components: {
    Navbar,
  },

}
</script>

<style>
@font-face {
  font-family: "ProximaNova";
  src: local("ProximaNova"),
   url(./assets/fonts/ProximaNova-Light-webfont.woff2) format("truetype");
}

@font-face {
  font-family: "ProximaNova2";
  src: local("ProximaNova2"),
   url(./assets/fonts/ProximaNova-Reg-webfont.woff2) format("truetype");
}

html{
  width: 100%;
  height:100%;
  margin: 0;
  /* background-color: #f0f0f0; */
}

#app {
  font-family: ProximaNova, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

a{
  text-decoration: none;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
}

.error:first-letter{
  text-transform: capitalize;
}

#nprogress .bar {
  height: 8px;
}

#nprogress .bar {
  /* background: purple; */
  background: #7688b886;
}

#nprogress .spinner-icon {
  border-top-color: #827ffe;
  border-left-color: #827ffe;
}
/* 
.w3-sidebar{
} */

.w3-move-left{
  margin-left:200px;
  /* background-color: #827ffe; */
}

.w3-contentx{
  margin-left:auto;
  margin-right:auto;
  max-width:1380px;
}

.blue1{
  background-color: #2D8CD4;
}

.dark-blue{
  background-color: #1d4476cb;
}

.i-block{
  display: inline-block;
}

.w3-main > div{
  margin-top: 15px;
}

.error{
  background-color: #CE3939;
  padding: 8px;
  text-align: center;
  margin-top: 20px;
  color: #fff;
  border-radius: 4px;
}
</style>
