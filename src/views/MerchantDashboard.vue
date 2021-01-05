<template>
  <div class="w3-contentx">
    <Sidebar />
    <router-view></router-view>
  </div>




</template>

<script>
import Sidebar from '../components/Merchant/Sidebar.vue'

export default {
  name: "MerchantDashboard",

  data() {
    return{
      data: ""
    }
  },


  components: {
    Sidebar,
  },

};
</script>

<style scoped>

</style>