<template>
    <div class="w3-main w3-move-left w3-padding">
        <div class="w3-row">
          <div class="w3-col l10 m9 s12 w3-xlarge">
            {{shop.name}} - {{$helpers.checkDescription(shop.description)}}
          </div>

          <div class="w3-round w3-center w3-card w3-col l2 m3 s12 w3-padding w3-text-white dark-blue i-block" v-if="shop.is_active">
            <router-link :to="{  name: 'add_product' }">+ Add Product</router-link>
          </div>
       </div>

        <hr />
        
        <div class="w3-border w3-round-large i-block w3-padding-small w3-margin-right">
            DELIVERY FEE: {{user.country.currency}} {{this.$helpers.fmtNumber(shop.delivery_fee)}}
        </div>

        <div class="w3-border w3-round-large i-block w3-padding-small w3-margin-right">
            <span v-if="!shop.is_active">
                DISPATCH RIDER: Not yet assigned.
            </span>
            <span v-else>
                DISPATCH RIDER: {{shop.rider}}
            </span>
        </div>

        <div class="w3-border w3-round-large i-block w3-padding-small w3-margin-right"
        :class="shop.is_active ? 'w3-green': 'w3-red'"
        v-if="!shop.is_active">
            <div @click="makePayment">
                <span>APPROVED STATUS: Not yet, <u>VERIFY NOW</u></span>
            </div>
        </div>

        <router-link :to="{ name: 'shop', params: {shopslug: shop.sub_domain} }">

        <div class="w3-round-large w3-card i-block w3-padding-small w3-margin-right w3-teal" v-if="shop.is_active">
            VIEW LIVE        
        </div>

        </router-link>

        <hr />

        <div v-if="shop.is_active">
            <div class="w3-paddingx w3-large" v-if="products.length > 0">
                <div class="w3-margin-bottom product" v-for="product in products" :key="product.id">
                    <img class="image w3-card" :src="$helpers.setImg(product.image, 'product')" alt="">
                    
                    <div class="" style="padding: 10px 0 0 80px">
                        {{product.name}} 
                        
                        <span class="w3-teal w3-round-xlarge w3-padding-small w3-margin-left">
                            {{user.country.currency}} {{$helpers.fmtNumber(product.price)}}                        
                        </span>
                        <br>
                        <span class="w3-medium">
                            {{$helpers.checkDescription(product.description)}}
                        </span>
                    </div>
                    <br><br>
                </div>
                <br>
            </div>
            <div class="w3-center" v-else>
                <br /><br />
                <div class="">
                    <svg width="50" height="38" viewBox="0 0 50 38" fill="#6B6F76" class="sc-pIgJL cwcLgV"><path d="M15.0076 31.2798L15.3611 31.6334L15.7147 31.2798L45.0022 1.9923C45.9607 1.03382 47.4783 1.03382 48.4368 1.9923C49.3952 2.95079 49.3952 4.46837 48.4368 5.42686L17.0786 36.7554L17.0784 36.7556C16.1199 37.7141 14.5728 37.7141 13.6143 36.7556L1.21887 24.3602C0.260378 23.4017 0.260378 21.8841 1.21887 20.9256C2.17735 19.9671 3.69494 19.9671 4.65343 20.9256L15.0076 31.2798Z"></path></svg>
                </div>
                <br />
                No products added yet.              
            </div>
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
            amount: 20,

            products: [],
        }
    },

    methods: {
        ...mapActions('shops', ['approveShop', 'fetchShops', 'getShopProducts']),
        
        makePayment() {
            const self = this
            this.$launchFlutterwave({
                tx_ref: Date.now(),
                amount: this.amount,
                currency: 'USD',
                payment_options: 'card,mobilemoney,ussd',
                customer: {
                    email: this.user.email,
                    phone_number: this.user.phone_number,
                    name: this.full_name
                },
                callback: function(data) {
                    const serverData = {
                        amount: data.amount,
                        currency: data.currency,
                        merchant: self.user.merchant_id,
                        shop: self.shop.id,
                        status: data.status,
                        flw_ref: data.flw_ref,
                        transaction_id: data.transaction_id,
                        tx_ref: data.tx_ref,
                        payment_type: 'approval'
                    }

                    self.approveShop(serverData).then(res => {
                        self.fetchShops(self.user.id).then(res => {})
                        .catch((err) => {
                            // this.isLoading = false
                        })
                    })
                    .catch((err) => {
                        // this.isLoading = false
                    })


                },
                customizations: {
                title: 'Shop Approval',
                description: 'Payment to Approve Current Shop',
                logo: 'https://miro.medium.com/fit/c/262/262/1*r8AYd7cbKl_6fs61eHj-WQ.jpeg'
                }
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

        full_name: function(){
            return this.user.first_name + ' ' + this.user.last_name
        },
    
    },

    created: function () {
        this.getShopProducts(this.shop.id).then(res => {
            this.products = res.data
        })
        .catch((err) => {
            // this.isLoading = false
        })
    },

};

</script>

<style scoped>
.image{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    float: left
    /* vertical-align: super; */
}

.product:not(:last-child){
    border-bottom: 1px solid rgb(232, 232, 232);
}
</style>