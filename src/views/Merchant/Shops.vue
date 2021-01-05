<template>
    <div class="w3-main w3-main-main w3-w3-padding">
        <div class="" style="font-size: 20px;">
            Your Shops
        </div>

        <div class="w3-round w3-margin-top w3-grey w3-padding w3-text-white" style="display: inline-block;">
            <router-link :to="{ name: 'home' }" class="">
                + Create Shop
            </router-link>
        </div>

        <br>
        <br>

        <div v-if="shops.length > 0">
            <ShopTemplate v-for="item in shops" :shop="item" :key="item.id" />
        </div>
        <div v-else>
            No shop created yet.
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import ShopTemplate from "@/components/Merchant/ShopTemplate.vue"

export default {
  name: "Shops",

  data() {
    return{
      data: ""
    }
  },

  components:{
    ShopTemplate
  },

  computed: {
    ...mapState('shops', ['shops']),
  },

  
};
</script>
