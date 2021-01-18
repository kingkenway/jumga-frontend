<template>
  <div class="main w3-padding-small">
		<!-- <div class="login-header">SIGN UP</div> -->

		<div class="main-2 w3-padding-small">
      <div class="w3-center w3-xlarge">
        Apply to Sell
        <br>
        <span class="w3-small">
          Apply to sell on Jumga to get access to thousands of customers.
        </span>
        <hr>
      </div>

			<form @submit.prevent="signup">

        <div class="error" v-if="error_message">
          {{error_message}}
        </div>

        <div
          class="error"
          v-for="(err, index) in authError['merchantSignupError']"  :key="index"
          >{{ err }}<br/>
        </div>

				<div class="item">
          <input v-model="email" type="email" class="w3-input" placeholder="Email" value="" required="">
				</div>

        <div class="item">
          <input v-model="first_name" type="text" class="w3-input" placeholder="First Name" value="" required="">
				</div>

        <div class="item">
          <input v-model="last_name" type="text" class="w3-input" placeholder="Last Name" value="" required="">
				</div>

        <div class="item">
          <input v-model="phone_number" minlength="10" type="text" class="w3-input" placeholder="Phone Number" value="" required="">
				</div>

       
        <div class="item">
          <select v-model="country" class="w3-select" required>
            <option selected="" value="">Select Country</option>
            <option v-for="(value, index) in countries" :key="index" :value="value.id">{{value.name}}</option>
          </select>
				</div>

        <div class="item">
          <input v-model="password1" type="password" class="w3-input" placeholder="Password" value="" required="">
        </div>

        <div class="item">
          <input v-model="password2" type="password" class="w3-input" placeholder="Confirm Password" value="" required="">
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

        <hr />
        
        <router-link :to="{ name: 'loginmerchant' }" class="w3-bar-item">
          <div class="w3-small w3-center">
            Already have an account? <u>Log In</u>
          </div>      
        </router-link>

        <br>
        <br>
        <br>
       


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

.main{
  /* background-color: red; */
  margin-top: 40px !important;
  margin: 0 auto;
  max-width: 400px;
}

.item{
  margin-top: 20px;
}

.button{
  /* margin: 0 auto; */
  width: 100%;
  height: 40px !important;
  margin-top: 10px;
  background-color: #1d4476cb !important;
  color: #fff !important;
}

select{
  background-color: #fff;
}

.error{
  background-color: #CE3939;
  padding: 8px;
  text-align: center;
  margin-top: 20px;
  color: #fff;
  border-radius: 4px;
}
</style>
