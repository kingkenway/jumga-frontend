<template>
    <div class="w3-main w3-main-main w3-w3-padding">
        <div class="" style="font-size: 20px;">
          Create your Shop
        </div>

        <form @submit.prevent="create">

        <div class="error">
          {{error_message}}
        </div>

				<div class="item">
          <input v-model="name" type="text" class="input" placeholder="Name" value="" required="">
				</div>

        <div class="item">
          <input v-model="description" type="text" class="input" placeholder="Description" value="">
        </div>

        <div class="item">
          <input v-model="delivery_fee" type="text" class="input" placeholder="Delivery Fee" value="">
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
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import VueButtonSpinner from 'vue-button-spinner';

export default {
  name: "AddShop",

  data() {
    return{
      error_message : "",

      name: "",
      description: "",
      delivery_fee: "",

      isLoading: false,
      status: '',
    }
  },

  methods:{
     ...mapActions('shops', ['addShop']),

     create: function () {
      
      this.error_message = ""        
      this.isLoading = true

      let data = {
        name: this.name,
        description: this.description,
        delivery_fee: this.delivery_fee,

        user: this.user.merchant_id
      }

      console.log(data);
      
      this.addShop(data).then(res => {})
      .catch((err) => {
        this.isLoading = false
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
