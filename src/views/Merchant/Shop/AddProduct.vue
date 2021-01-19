<template>
    <div class="w3-main w3-move-left w3-padding">
         <!-- <div class="w3-row">
          <div class="w3-col l9 w3-xlarge">
            Add New Product - {{shop.name}}
          </div>
         </div> -->

       <Topbar :current_shop="shop">
           Add New Product -
       </Topbar>

        <hr />

        <div>
            <form @submit.prevent="add">

                <div
                class="error"
                v-for="(err, index) in error_message" :key="index"
                >{{ err }}<br/>
                </div>


                <div class="item">
                    <input v-model="name" type="text" class="w3-input" placeholder="Name" value="" required="">
                </div>

                <div class="item">
                    <input v-model="description" type="text" class="w3-input" placeholder="Description" value="">
                </div>

                <div class="item">
                    <input v-model="price" type="number" class="w3-input" placeholder="Price" value="" required="">
                </div>

                <div class="item">
                    Add Image
                    <input ref="image" type="file" v-on:change="handleFileUpload()" class="w3-input" placeholder="Delivery Fee">
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
import { mapState, mapGetters, mapActions } from 'vuex'
import VueButtonSpinner from 'vue-button-spinner';
import { operatorValues } from '@/utils/utils'
import Topbar from '@/components/Shop/Topbar.vue'

export default {
    name: "AddProduct",

    data() {
        return{
            error_message : "",

            name: "",
            description: "",
            price: "",
            image: "",

            isLoading: false,
            status: '',            
        }
    },

    methods: {
        ...mapActions('shops', ['addProduct']),

        handleFileUpload: function () {
            this.image = this.$refs.image.files[0]
        },

        add: function () {

            let form = new FormData();
            
            form.append('name', this.name)
            form.append('price', this.price)
            form.append('description', this.description)
            form.append('shop', this.shop.id)

            if (this.image) {
                form.append('image', this.image)
            }

            
            this.addProduct(form).then(res => {})
            .catch((err) => {
                this.isLoading = false
                this.error_message = operatorValues(err.response.data)
            })
                        
        }

    },

    computed: {
        ...mapState('shops', ['shops']),
        ...mapGetters('auth', ['user', ]),
        
        shop: function(){
            const result = this.shops.find( ({ sub_domain }) => sub_domain === this.$route.params.slug );
            return result;
        },
   
    },

    components: {
        'button-spinner': VueButtonSpinner,
        Topbar
    },
    
    created: function () {
        
    },

};

</script>

<style scoped>
.item{
  margin-bottom: 15px;
}
</style>