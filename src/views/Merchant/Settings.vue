<template>
  <div class="w3-main w3-move-left w3-padding">
    
    <div class="w3-row">
      <div class="w3-col l9 w3-xlarge">
        <ToggleSidebar />
        Settings
        <div class="w3-small">Reset your account password</div>
      </div>

    </div>

    <hr />


    <div>
        <form @submit.prevent="update">

            <div class="error bg-red w3-margin-bottom" v-for="(err, index) in error_message" :key="index">
              {{err}}
            </div>

            <div class="error w3-green w3-margin-bottom" v-if="success">
              {{success}}
            </div>

            <div class="item w3-row">
              Old Password
              <input v-model="old_password" type="text" class="w3-input" required="">
            </div>

            <div class="item w3-row">
              New Password
              <input v-model="new_password" type="text" class="w3-input" value="" required="">
            </div>


            <div class="item">
              <button-spinner
                :is-loading="isLoading"
                :disabled="isLoading"
                :status="status"
                class="button">
                  Update
              </button-spinner>
            </div>
            
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
  name: "Settings",

  data() {
    return{
      error_message : "",
      success : "",

      old_password: "",
      new_password: "",

      isLoading: false,
      status: '',
    }
  },

  methods:{
    ...mapActions('auth', ['updatePassword']),

    update: function () {

      this.error_message = ""        
      this.isLoading = true

      const data = {
        "old_password": this.old_password,
        "new_password": this.new_password
      }

      this.updatePassword(data).then(res => {
          this.success = "Password successfully changed."
          this.old_password = ""
          this.new_password = ""
          this.isLoading = false
      })
      .catch((err) => {
          this.error_message = operatorValues(err.response.data)
          this.isLoading = false
      })

    
    },
    
  },



  components: {
    'button-spinner': VueButtonSpinner,
    ToggleSidebar
  },

  computed: {
    ...mapState('shops', ['shops']),
    ...mapGetters('auth', ['user', 'isLoggedIn'])    
  },


};
</script>

<style scoped>
.item{
    margin-bottom: 30px;
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
</style>