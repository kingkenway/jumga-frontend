<template>
  <div class="signup-main-1x first w3-padding-small">
		<!-- <div class="login-header">SIGN UP</div> -->

		<div class="main-2">
			<form @submit.prevent="login">

        <div class="error">
          {{error_message}}
        </div>

        <div class="error">{{ authError['merchantLoginError'] }}<br/>
        </div>

				<div class="item">
          <input v-model="email" type="email" class="input" placeholder="Email" value="" required="">
				</div>

        <div class="item">
          <input v-model="password" type="password" class="input" placeholder="Your Password" value="" required="">
        </div>

        <div class="item">
          <button-spinner
            :is-loading="isLoading"
            :disabled="isLoading"
            :status="status"
            class="button">
              LOGIN
          </button-spinner>
        </div>
        


			</form>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import VueButtonSpinner from 'vue-button-spinner';

export default {
  name: 'MerchantLogin',
  data(){
    return {
      error_message : "",

      email: "",
      password: "",

      isLoading: false,
      status: '',
    }
  },
  methods: {
    ...mapActions('auth', ['loginMerchant']),
    // ...mapMutations('auth', ['auth_reset']),
    
    login: function () {
      this.error_message = ""        
      this.isLoading = true

      let userInfo = {
        email: this.email,
        password: this.password
      }

      console.log(userInfo);
      
      this.loginMerchant(userInfo).then(res => {})
      .catch((err) => {
        this.isLoading = false
      })
    
    }
  },
 
  components: {
    'button-spinner': VueButtonSpinner,
  },

//   beforeRouteLeave (to, from, next) {
//     this.auth_reset('signup')
//     next()
//   },

  computed:{
    ...mapState('auth', ['authError', 'countries']),
  } 

}
</script>

<style scoped>
/* @import '../assets/css/login.css'; */
</style>
