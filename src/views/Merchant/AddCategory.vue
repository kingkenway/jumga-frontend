<template>
  <div class="w3-main w3-move-left w3-padding">
    
    <div class="w3-row">
      <div class="w3-col l9 w3-xlarge">
        Add Category
      </div>

    </div>

    <hr />


    <div>
        <form @submit.prevent="add">

            <div class="error">
              {{error_message}}
            </div>

            <div class="item w3-row">
              <input v-model="name" type="text" class="w3-input w3-third" placeholder="Name" value="" required="">
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

export default {
  name: "AddCategory",

  data() {
    return{
      error_message : "",

      name: "",

      isLoading: false,
      status: '',
    }
  },

  methods:{
    ...mapActions('shops', ['addCategory']),

    create: function () {

      this.error_message = ""        
      this.isLoading = true
    
    },
    
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
    margin-bottom: 30px;
}
</style>