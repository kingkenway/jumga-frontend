<template>
  <div>
    <router-link :to="{ name: 'transactions' }" class="w3-bar-item">
        ALL TRANSACTIONS
    </router-link>
    <router-link :to="{ name: 'earnings' }" class="w3-bar-item">
        JUMGA'S TRANSACTIONS
    </router-link>
    <router-link :to="{ name: 'allorders' }" class="w3-bar-item">
        ALL ORDERS
    </router-link>
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

<style scoped>
a{
    padding: 8px
}

a.router-link-exact-active {
  /* text-decoration: underline; */
  color: #827ffe;
  border-bottom: 4px solid #827ffe;
}

</style>
