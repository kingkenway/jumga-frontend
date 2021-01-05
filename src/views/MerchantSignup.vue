<template>
  <div class="signup-main-1x first w3-padding-small">
		<!-- <div class="login-header">SIGN UP</div> -->

		<div class="main-2">
			<form @submit.prevent="signup">

        <div class="error">
          {{error_message}}
        </div>

        <div
          class="error"
          v-for="(err, index) in authError['merchantSignupError']"  :key="index"
          >{{ err }}<br/>
        </div>

				<div class="item">
          <input v-model="email" type="email" class="input" placeholder="Email" value="" required="">
				</div>

        <div class="item">
          <input v-model="first_name" type="text" class="input" placeholder="First Name" value="" required="">
				</div>

        <div class="item">
          <input v-model="last_name" type="text" class="input" placeholder="Last Name" value="" required="">
				</div>

        <div class="item">
          <input v-model="phone_number" type="text" class="input" placeholder="Phone Number" value="" required="">
				</div>

       
        <div class="item">
          <select v-model="country" required>
            <option selected="" value="">Select Country</option>
            <option v-for="(value, index) in countries" :key="index" :value="value.id">{{value.name}}</option>
          </select>
				</div>

        <div class="item">
          <input v-model="password1" type="password" class="input" placeholder="Password" value="" required="">
        </div>

        <div class="item">
          <input v-model="password2" type="password" class="input" placeholder="Confirm Password" value="" required="">
        </div>

        <div class="item">
          <button-spinner
            :is-loading="isLoading"
            :disabled="isLoading"
            :status="status"
            class="button">
              SIGNUP
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
  name: 'MerchantSignup',
  data(){
    return {
      error_message : "",

      email : "",
      first_name : "",
      last_name : "",
      country : "",
      phone_number : "",
      password1 : "",
      password2 : "",

      isLoading: false,
      status: '',
    }
  },
  methods: {
    ...mapActions('auth', ['signupMerchant']),
    // ...mapMutations('auth', ['auth_reset']),
    
    signup: function () {
      this.error_message = ""

      if(this.password1 != this.password2){
        this.error_message = "Your passwords do not match."
      }else{
        this.error_message = ""        
        this.isLoading = true

        let userInfo = {
          email: this.email,
          password1: this.password1,
          password2: this.password2,
          profile: {
            first_name: this.first_name,
            last_name: this.last_name,
            phone_number: this.phone_number,
            country: this.country,
          }
        }

        console.log(userInfo);
        
        this.signupMerchant(userInfo).then(res => {})
        .catch((err) => {
          this.isLoading = false
        })
      
      }


      
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
