<template>
  <div class="w3-contentx">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Sidebar from '../components/Merchant/Sidebar.vue'

export default {
  name: "MerchantDashboard",

  data() {
    return{
      data: ""
    }
  },

   methods: {
    ...mapMutations('auth', ['toggleSidebarStatus']),
  
   },

  watch: {
    '$route': function () {
      this.toggleSidebarStatus("w3-hide");
    }
  },


  components: {
    Sidebar,
  },

};
</script>

<style scoped>

</style>