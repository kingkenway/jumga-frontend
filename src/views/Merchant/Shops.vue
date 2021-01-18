<template>
    <div class="w3-main w3-move-left w3-padding">
        <div class="w3-row">
          
          <div class="w3-col l10 m9 s6 w3-xlarge">
            <ToggleSidebar />
            Your Shops
          </div>

          <div class="w3-round w3-center w3-card w3-col l2 m3 s6 w3-padding w3-text-white dark-blue" style="display: inline-block;">
              <router-link :to="{ name: 'add_shop' }" class="">
                  + Create Shop
              </router-link>
          </div>
        </div>

        <hr />

        <div v-if="shops.length > 0">
            <ShopTemplate v-for="item in shops" :shop="item" :key="item.id" />
        </div>
        <div class="w3-center" v-else>
          <br /><br />
          <div class="">
            <svg width="50" height="38" viewBox="0 0 50 38" fill="#6B6F76" class="sc-pIgJL cwcLgV"><path d="M15.0076 31.2798L15.3611 31.6334L15.7147 31.2798L45.0022 1.9923C45.9607 1.03382 47.4783 1.03382 48.4368 1.9923C49.3952 2.95079 49.3952 4.46837 48.4368 5.42686L17.0786 36.7554L17.0784 36.7556C16.1199 37.7141 14.5728 37.7141 13.6143 36.7556L1.21887 24.3602C0.260378 23.4017 0.260378 21.8841 1.21887 20.9256C2.17735 19.9671 3.69494 19.9671 4.65343 20.9256L15.0076 31.2798Z"></path></svg>
          </div>
          <br />
          No shop created yet.              
        </div>

        <br><br>

    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import ShopTemplate from "@/components/Merchant/ShopTemplate.vue"
import ToggleSidebar from "@/components/Merchant/ToggleSidebar.vue"

export default {
  name: "Shops",

  data() {
    return{
      data: ""
    }
  },

  components:{
    ShopTemplate,
    ToggleSidebar
  },

  computed: {
    ...mapState('shops', ['shops']),
  },

  
};
</script>
