<template>
  <div class="w3-main w3-move-left w3-padding">
    
    <div class="w3-row">
      <div class="w3-col l9 w3-xlarge">
        <ToggleSidebar />
        Overview
      </div>

    </div>

    <hr />

    <div class="w3-row">
      <router-link :to="{ name: 'orders' }">
      <div class="w3-border w3-round w3-padding w3-card">
        <div class="w3-xlarge">ORDERS</div>
        <hr>

        <div class="w3-large">
          {{data.orders}}
        </div>
      </div>
      </router-link>

      <router-link :to="{ name: 'shops' }">
      <div class="w3-margin-top w3-margin-rightx w3-half w3-padding">
        <div class="w3-border w3-round w3-padding w3-card">
          <div class="w3-xlarge">SHOPS</div>
          <hr>        

          <div class="w3-large">
            {{data.shops}}
          </div>

        </div>
      </div>
      </router-link>

      <div class="w3-margin-top w3-margin-rightx w3-half w3-padding">
        <div class="w3-border w3-round w3-padding w3-card">
          <div class="w3-xlarge">PRODUCTS</div>
          <hr>        

          <div class="w3-large">
            {{data.products}}
          </div>
        </div>        
      </div>

    </div>
    
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import VueButtonSpinner from 'vue-button-spinner';
import ToggleSidebar from "@/components/Merchant/ToggleSidebar.vue"
import { operatorValues } from '@/utils/utils'

export default {
  name: "Overview",

  data() {
    return{
      data : "",
      isLoading: false,
      status: '',
    }
  },

  methods:{
    ...mapActions('shops', ['merchantOverview']),
  },

  created: function(){
    this.merchantOverview(this.user.id).then(res => {
      this.isLoading = false
      this.data = res.data
    })
    .catch((err) => {
      this.isLoading = false
    })    
  },

  components:{
    ToggleSidebar
  },

  computed: {
    ...mapState('auth', ['user', 'countries']),
    // ...mapGetters('auth', ['user', 'isLoggedIn'])    
  },


};
</script>

<style scoped>
.item{
    margin-bottom: 30px;
    padding: 12px;
}


.error{
  padding: 8px;
  display: block;
  margin-top: 20px;
  color: #fff;
  border-radius: 4px;
}

.bg-red{
  background-color: #CE3939;
}

select{
  background-color: #fff;
}
</style>