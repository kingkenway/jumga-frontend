<template>
    <div class="w3-main w3-move-left w3-padding">
       <div class="w3-row">
          <div class="w3-col l9 w3-xlarge">
            Create your Shop
          </div>
       </div>

        <hr />

        <div class="" style="max-width: 500px">
          <form @submit.prevent="create">

            <!-- <div class="error">
              {{error_message}}
            </div> -->

            <div
              class="error"
              v-for="(err, index) in error_message" :key="index"
              >{{ err }}<br/>
            </div>

            <div class="item">
              <input v-model="name" type="text" class="w3-input" placeholder="Name" value="" required="">
            </div>

            <div class="item">
              <input v-model="description" type="text" class="w3-input" placeholder="Description" value="" required="">
            </div>

            <div class="item">
              <input v-model="delivery_fee" type="number" class="w3-input" placeholder="Delivery Fee" value="" required="">
            </div>

            <div class="item">
              Select Logo
              <input ref="logo" type="file" v-on:change="handleLogoFileUpload()" class="w3-input" placeholder="Delivery Fee">
            </div>

            <div class="item">
              Select Banner Image
              <input ref="banner_image" type="file" v-on:change="handleBannerFileUpload()" class="w3-input" placeholder="Delivery Fee">
            </div>

            <div class="item">
              <button-spinner
                :is-loading="isLoading"
                :disabled="isLoading"
                :status="status"
                class="button">
                  CREATE
              </button-spinner>
            </div>
            
          </form>
        </div>

    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import VueButtonSpinner from 'vue-button-spinner';
import { operatorValues } from '@/utils/utils'

export default {
  name: "AddShop",

  data() {
    return{
      error_message : "",

      name: "",
      description: "",
      delivery_fee: "",
      logo: "",
      banner_image: "",      

      isLoading: false,
      status: '',
    }
  },

  methods:{
    ...mapActions('shops', ['addShop']),

    handleLogoFileUpload: function () {
      this.logo = this.$refs.logo.files[0]
    },

    handleBannerFileUpload: function () {
      this.banner_image = this.$refs.banner_image.files[0]    
    },

    create: function () {

      this.error_message = ""        
      this.isLoading = true

      let form = new FormData();
      
      form.append('name', this.name)
      form.append('description', this.description)
      form.append('delivery_fee', this.delivery_fee)
      form.append('user', this.user.merchant_id)

      if (this.logo) {
        form.append('logo', this.logo)
      }
      
      if (this.banner_image) {
        form.append('banner_image', this.banner_image)
      }

      this.addShop(form).then(res => {})
      .catch((err) => {
        this.isLoading = false
        this.error_message = operatorValues(err.response.data)
      })

    }
  },

  components: {
    'button-spinner': VueButtonSpinner,
  },

  computed: {
    ...mapState('shops', ['shops']),
    ...mapGetters('auth', ['user', 'isLoggedIn'])    
  },

  
};
</script>

<style scoped>
.item{
  margin-bottom: 15px;
}
</style>