<template>

    <div class="w3-main w3-main-main w3-w3-padding">
        Name: {{shop.name}}
        <br><br>

        Desc: {{shop.description}}
        <br><br>

        Your Delivery Fee: {{shop.delivery_fee}}
        <br><br>

        Is Approved: 
        <span v-if="shop.is_active">Shop is approved</span>
        <span v-else>
            Not Approved. Click here to approve
        </span>

        <br><br>

        <div>
            Make Payment

            <form action="#" @submit.prevent="makePayment">
                <div class="btn-wrapper">
                    <input type="number" v-model.number="amount" />
                    <button type="submit">Make Payment</button>
                </div>
            </form>
        </div>

    </div>

    
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: "ShopDetail",

    data() {
        return{
            data: "",
            amount: 20
        }
    },

    methods: {

        makePayment() {
            this.$launchFlutterwave({
                tx_ref: Date.now(),
                amount: this.amount,
                currency: 'NGN',
                payment_options: 'card,mobilemoney,ussd',
                customer: {
                email: 'user@gmail.com',
                phonenumber: '08102909304',
                name: 'yemi desola'
                },
                callback: function(data) {
                // specified callback function
                console.log(data)
                },
                customizations: {
                title: 'My store',
                description: 'Payment for items in cart',
                logo: 'https://assets.piedpiper.com/logo.png'
                }
            })
        }

    },

    computed: {
        ...mapState('shops', ['shops']),
        
        shop: function(){
            const result = this.shops.find( ({ sub_domain }) => sub_domain === this.$route.params.slug );
            return result;
        },
    
    },

    created: function () {
        console.log(1212);
        console.log(this.shop);
    },






};
</script>
