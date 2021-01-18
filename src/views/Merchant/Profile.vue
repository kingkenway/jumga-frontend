<template>
  <div class="w3-main w3-move-left w3-padding">
    
    <div class="w3-row">
      <div class="w3-col l9 w3-xlarge">
        <ToggleSidebar />
        Profile
        <div class="w3-small">Manage your Jumga profile</div>
      </div>

    </div>

    <hr />


    <div>

      <!-- {{user.first_name}}
      {{user.last_name}}
      {{user.email}}
      {{user.first_name}}
      {{user.country.name}}
      {{user.phone_number}} -->

      
        <form @submit.prevent="update">

          <div class="w3-row">

            <div class="error bg-red w3-margin-bottom" v-for="(err, index) in error_message" :key="index">
              {{err}}
            </div>

            <div class="error w3-green w3-margin-bottom" v-if="success">
              {{success}}
            </div>

            <div class="item w3-half">
              First Name
              <input v-model="first_name" type="text" class="w3-input" required="" disabled="">
            </div>

            <div class="item w3-half">
              Last Name
              <input v-model="last_name" type="text" class="w3-input" required="" disabled="">
            </div>

            <div class="item w3-half">
              Email
              <input v-model="email" type="text" class="w3-input" value="" required="" disabled="">
            </div>

            <div class="item w3-half">
              Phone Number
              <input v-model="phone_number" type="text" class="w3-input" value="" required="" disabled="">
            </div>

            <div class="item w3-half">
              Country
              <select v-model="country" class="w3-select" required="" disabled="">
                <option selected="" value="">Select Country</option>
                <option v-for="(value, index) in countries" :key="index" :value="value.id">{{value.name}}</option>
              </select>
            </div>

          </div>

          <!-- <div class="item">
            <button-spinner
              :is-loading="isLoading"
              :disabled="isLoading"
              :status="status"
              class="button">
                Update
            </button-spinner>
          </div> -->
          
        </form>
        
    </div>


    
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import VueButtonSpinner from 'vue-button-spinner';
import ToggleSidebar from "@/components/Merchant/ToggleSidebar.vue"
import { operatorValues } from '@/utils/utils'

export default {
  name: "Profile",

  data() {
    return{
      error_message : "",
      success : "",

      first_name: "",
      last_name: "",
      email: "",
      country: "",
      phone_number: "",

      isLoading: false,
      status: '',
    }
  },

  methods:{
    ...mapActions('auth', ['updateProfile']),

    update: function () {

      this.error_message = ""        
      this.isLoading = true

      // let data = {
      //   email: this.email,
      //   userprofile: {
      //     first_name: this.first_name,
      //     last_name: this.last_name,
      //     phone_number: this.phone_number,
      //     country: this.country,
      //   }
      // }

      let data = {
        email: this.email,
        userprofile: {
          first_name: this.first_name,
          last_name: this.last_name,
          phone_number: this.phone_number,
          country: this.country,
        }
      }

      const payload = {data, id: this.user.id}

      this.updateProfile(payload).then(res => {
          this.success = "Profile successfully updated."
          this.isLoading = false
      })
      .catch((err) => {
          this.error_message = operatorValues(err.response.data)
          this.isLoading = false
      })

    },
    
  },

  created: function(){
    this.first_name = this.user.first_name
    this.last_name = this.user.last_name
    this.email = this.user.email
    this.phone_number = this.user.phone_number
    this.country = this.countries.find( ({ name }) => name == this.user.country.name ).id
  },

  components: {
    // 'button-spinner': VueButtonSpinner,
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