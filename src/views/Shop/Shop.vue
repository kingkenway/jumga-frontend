<template>
    <div class="w3-contentx w3-padding">
       
        <span v-if="isLoading">
            <center>
                Please Wait...
                <i class="fa fa-circle-notch fa-spin w3-center"></i>
            </center>
        </span>
        <div v-else>

            <div
                :style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' +this.$helpers.setImg(current_shop.banner_image, 1)+  ')' }"
                class="w3-padding w3-xlarge header">

                <div class="i-block">
                    <img class="logo" :src="this.$helpers.setImg(current_shop.logo)" alt="" >
                </div>
                <div class="name i-block w3-padding">
                    Welcome to {{current_shop.name}}
                    <br />
                    <span class="w3-medium">
                        {{this.$helpers.checkDescription(current_shop.description)}}
                    </span>
                </div>
            </div>

            <br>

            <div class="w3-margin-top w3-row">
                <div
                    class="w3-padding w3-round w3-third"
                    v-for="(product, index) in products" :key="index">

                    <div class="w3-padding product">
                        <div class="w3-center">
                            <div>
                                <img class="pdt-img" :src="$helpers.setImg(product.image, 'product')" alt="" >
                            </div>

                            <span class="w3-xlarge">
                                {{product.name}}
                            </span>
                            <br />
                            <b>{{currency}} {{product.price}}</b>
                        </div>

                        <br>

                        <div class="w3-center">
                            <span v-if="retrieveCartItemQuantity(product.id)">
                                <span class="w3-padding w3-grey w3-round-xxlarge w3-text-white" @click.prevent="add_or_remove_quantity_to_cart({id: product.id, remove: 'remove'})">-</span>
                                <span class="w3-padding">{{ retrieveCartItemQuantity(product.id) }}</span>
                            </span>
                            <span class="w3-padding w3-grey w3-round-xxlarge w3-text-white" @click.prevent="addToCart(product)">+</span>
                        </div>
                        <br>
                    </div>
                    
                </div>
            </div>


        </div>

        <br /><br /><br />


        <router-link :to="{ name: 'checkout' }">

            <div 
                class="w3-center w3-padding w3-round w3-xlarge dark-blue w3-text-white w3-bottom w3-contentx" 
                v-if="cart.length">
                {{cart.length}} items in cart ( {{currency}} {{totalAmountInCart}})
            </div>

        </router-link>

        
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
// import VueButtonSpinner from 'vue-button-spinner';

export default {
    name: "Shop",

    data() {
        return{
            isLoading: true,
            status: '',   
            // merchant_shop: [],
            products: [],
        }
    },

    methods: {
        ...mapActions('shops', ['getAndShopProductsPublic']),
        ...mapMutations('shops', ['set_current_shop', 'push_to_cart', 'add_or_remove_quantity_to_cart', 'empty_cart']),
        
        addToCart: function (item) {
            item = {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
            }
            const result = this.cart.find( ({ id }) => id === item.id );
            
            if (result == null){
                this.push_to_cart(item)                
            }else(
                this.add_or_remove_quantity_to_cart({id: item.id})                
            )

        },

        retrieveCartItemQuantity: function (item) {
            const res = this.cart.find( ({ id }) => id === item )
            if (res) {return res.quantity}
        }

    },
    
    created: function () {
        this.getAndShopProductsPublic(this.$route.params.shopslug).then(res => {
            this.empty_cart()

            this.set_current_shop(res.data)
            this.products = res.data.products
            
            this.isLoading = false
        })
        .catch((err) => {
            this.isLoading = false
        })        
    },

    computed: {
        ...mapState('shops', ['current_shop', 'cart']),

        currency: function(){
            return this.current_shop.country.currency
        },

        totalAmountInCart: function(){
            return this.cart
                    .map(item => item.price * item.quantity)
                    .reduce((prev,curr) => prev + curr, 0)
                    .toLocaleString()
        },

        

        // products: function(){
        //     const res = this.current_shop.products
        //     return res
        // }
    },

    // components: {
    //     'button-spinner': VueButtonSpinner,
    // },


};

</script>

<style scoped>
.header{
    color: #fff;
    height: 150px;
    border-radius: 8px;
    /* border: 3px dashed #ccc;
    display: inline-block; */
    /* margin: 0 auto;
    text-align: center */
}

.name{
    vertical-align: middle;
    margin-top: 30px;
    font-weight: 800;
    letter-spacing: 2px;
}

.logo{
    margin-top: 30px;
    height: 80px;
    width: 80px;
    border-radius: 50%;
}

.pdt-img{
    margin-top: 30px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
}

.product{
    border: 1px solid #f3efee;
}
</style>