<template>
    <div class="w3-contentx w3-padding">

        <Topbar :current_shop="current_shop">
            Checkout from
        </Topbar>

        <br />

        <div v-if="cart.length > 0">
            
            <div class="personal-info"
                :class="!page_status ? show: hide">

                <br>

                <div class="w3-padding-large w3-large">
                DELIVERY INFORMATION
                <hr>

                <form @submit.prevent="addInfo">
                    <div class="w3-row">
                        
                        <div class="item w3-half w3-padding">
                            <input v-model="customer_name" type="text" class="w3-input" placeholder="Full Name" value="" required="">
                        </div>

                        <div class="item w3-half w3-padding">
                            <input v-model="customer_email" type="email" class="w3-input" placeholder="Email Address" value="" required="">
                        </div>

                        <div class="item w3-half w3-padding">
                            <input v-model="customer_contact" type="number" class="w3-input" placeholder="Phone Number" value="" required="">
                        </div>

                        <div class="item w3-half w3-padding">
                            <input v-model="customer_address" type="text" class="w3-input" placeholder="Street Address" value="" required="">
                        </div>

                        <div class="item w3-half w3-padding">
                            <input v-model="customer_city" type="text" class="w3-input" placeholder="Your City" value="" required="">
                        </div>

                    
                    </div>
                    
                    <div class="item w3-padding" style="">
                        <button class="button dark-blue w3-round-large w3-text-white w3-padding">NEXT</button>
                    </div>
                
                </form>
                
                </div>
            </div>

            <hr />


            <div class="checkout w3-row"
                style="display: none"
                :class="page_status ? show: hide">

                <div class="w3-half">
                    <div class="w3-padding w3-large"><b>DELIVERY INFORMATION</b></div>

                    <div class="w3-padding">
                        <div>
                            <p>FULL NAME: {{this.customer_name}}</p>
                        </div>

                        <div>
                            <p>EMAIL ADDRESS: {{this.customer_email}}</p>
                        </div>

                        <div>
                            <p>PHONE NUMBER: {{this.customer_contact}}</p>
                        </div>

                        <div>
                            <p>STREET ADDRESS: {{this.customer_address}}</p>
                        </div>

                        <div>
                            <p>YOUR CITY: {{this.customer_city}}</p>
                        </div>
                    </div>
                    
                </div>


                <div class="w3-half">
                    <div class="w3-padding w3-large"><b>CART</b></div>

                    <div class="w3-padding" v-for="(product, index) in cart" :key="index">
                        {{product.name}} - {{currency}} {{product.price}}
                        (x<span>{{ retrieveCartItemQuantity(product.id) }}</span>)

                        <span class="w3-right">
                            {{currency}} {{ fmtNumber(product.price * retrieveCartItemQuantity(product.id)) }}
                        </span>
                    </div>

                    <div class="w3-padding">
                        <div>
                            SUBTOTAL
                            <span class="w3-right">
                                {{currency}} {{fmtNumber(totalAmountInCart)}}                    
                            </span>
                        </div>

                        <br>

                        <div>
                            DELIVERY
                            <span class="w3-right">
                                {{currency}} {{fmtNumber(current_shop.delivery_fee)}}
                            </span>
                        </div>

                        <br>

                        <div>
                            <b>
                            TOTAL
                            <span class="w3-right">
                                {{currency}} {{ fmtNumber(current_shop.delivery_fee + totalAmountInCart) }}
                            </span>
                            </b>
                        </div>

                        <div @click="setOrder" class="w3-padding w3-center w3-border w3-margin-top dark-blue w3-text-white">
                            <b>Place Order ( {{currency}} {{ fmtNumber(totalAmount) }} )</b>
                        </div>
                    </div>

                </div>


            </div>
        </div>
        <div class="w3-center w3-large" v-else>
            <br><br><br>
            NOTHING IN CART
            <hr>
            <router-link :to="{name: 'shop'}">
                Go back to shop
            </router-link>
        </div>


    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import router from '@/router'
// import VueButtonSpinner from 'vue-button-spinner';
import Topbar from '@/components/Shop/Topbar.vue'

import Vue from 'vue'

export default {
    name: "Shop",

    data() {
        return{
            isLoading: true,
            status: '',

            page_status: false,
            show: 'w3-show',
            hide: 'w3-hide',
            
            customer_name: '',
            customer_email: '',
            customer_contact: '',
            customer_address: '',
            customer_city: ''
        }
    },

    methods: {
        ...mapActions('shops', ['placeOrder', 'orderPayment']),
        ...mapMutations('shops', ['set_customer', 'empty_cart']),

        setOrder: function (){
            // if((this.customer.length > 1) && (this.cart.length > 1)){
            // }

            let data = {
                shop: this.current_shop.id,
                customer_name: this.customer.customer_name,
                customer_email: this.customer.customer_email,
                customer_contact: this.customer.customer_contact,
                customer_address: this.customer.customer_address,
                customer_city: this.customer.customer_city,
                customer_instruction: '',

                cart: this.cart                
            }

            console.log(data)

            this.placeOrder(data).then(res => {
                this.makePayment()
            })
            .catch((err) => {
                alert('Error occured while creating order')
            })


        },


        addInfo: function (){
            let data = {
                customer_name: this.customer_name,
                customer_email: this.customer_email,
                customer_contact: this.customer_contact,
                customer_address: this.customer_address,
                customer_city: this.customer_city
            }

            this.set_customer(data)
            this.page_status = true
        },

        fmtNumber: function (item) {
            return item.toLocaleString()        
        },

        retrieveCartItemQuantity: function (item) {
            const res = this.cart.find( ({ id }) => id === item )
            if (res) {return res.quantity}
        },

        getCountry: function (item) {
            if (item == "GHS") return "GH"
            else if (item == "KES") return "KE"
            else return "NG"
        },
        
        makePayment() {
            const self = this
            this.$launchFlutterwave({
                tx_ref: Date.now(),
                amount: this.server_data.total_amount,
                currency: this.currency,
                country: this.getCountry(this.currency),
                payment_options: 'card,mobilemoney,ussd',
                customer: {
                    email: this.customer.customer_email,
                    phone_number: this.customer.customer_contact,
                    name: this.customer.customer_name
                },
                callback: function(data) {
                    const serverData = {
                        amount: data.amount,
                        currency: data.currency,
                        order: self.server_data.id,
                        shop: self.current_shop.id,
                        status: data.status,
                        flw_ref: data.flw_ref,
                        transaction_id: data.transaction_id,
                        tx_ref: data.tx_ref,
                        payment_type: 'sale'
                    }

                    self.orderPayment(serverData).then(res => {
                        console.log('lol');
                        console.log(res);
                        self.empty_cart(1)                        
                        router.push({name: 'success'})
                    })
                    .catch((err) => {
                        // this.isLoading = false
                        alert('Payment Failed')
                    })


                },
                customizations: {
                title: `${this.current_shop.name}.`,
                description: 'Make Payment',
                logo: "https://miro.medium.com/fit/c/262/262/1*r8AYd7cbKl_6fs61eHj-WQ.jpeg"
                }
            })
        }

    },
    
    created: function () {
        // if (this.customer.length){
            this.customer_name = this.customer.customer_name
            this.customer_email = this.customer.customer_email
            this.customer_contact = this.customer.customer_contact
            this.customer_address = this.customer.customer_address
            this.customer_city = this.customer.customer_city
        // }
    },

    computed: {
        ...mapState('shops', ['current_shop', 'cart', 'customer', 'server_data']),

        currency: function(){
            return this.current_shop.country.currency
        },

        totalAmountInCart: function(){
            return this.cart
                    .map(item => item.price * item.quantity)
                    .reduce((prev,curr) => prev + curr, 0)
        },

        totalAmount: function(){
            return this.current_shop.delivery_fee + this.cart
                    .map(item => item.price * item.quantity)
                    .reduce((prev,curr) => prev + curr, 0)            
        }

        
    },

    // components: {
    //     'button-spinner': VueButtonSpinner,
    // },

    components: {
        Topbar
    },

};

</script>

<style scoped>
.item{
    margin-bottom: 10px;
}

.button{
    border: none;
    width: 100%;
    font-size: 20px;
}
</style>