<template>
    <div class="w3-contentx w3-padding">

        <div class="w3-large">
            Your Orders
            <hr />

            <div v-if="status">

                
                <div class="w3-responsive">
                    <table class="w3-table-all">

                        <tr>
                            <td>Order ID.</td>
                            <td>Reference ID.</td>
                            <td>Shop Name</td>
                            <td>Customer Email</td>
                            <td>Customer City</td>
                            <td>Status</td>
                            <td>Amount</td>
                            <td>Time</td>
                        </tr>

                        <tr v-for="(order, index) in data" :key="index">
                            <td><b>#{{order.id}}</b></td>
                            <td>{{order.reference_id}}</td>
                            <td>{{order.shop.name}}</td>
                            <td>{{order.customer_email}}</td>
                            <td>{{order.customer_city}}</td>
                            <td>{{ statusStat[order.status] }}</td>
                            <td>{{order.shop.country.currency}} {{$helpers.fmtNumber(order.total_amount)}}</td>
                            <td>{{moment(order.created_at).format('LLL')}} </td>
                        </tr>

                        
                
                    </table>
                </div>



            </div>
            <div class="w3-large" v-else>
                No Matching records found!                
            </div>


            
        </div>
        
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
            status: false,
            data: ''
            // merchant_shop: [],
        }
    },

    methods: {
        ...mapActions('shops', ['customerOrders']),
    },
    
    created: function () {
        const params = {
            email: this.$route.params.email,
            contact: this.$route.params.contact,
        }
        this.customerOrders(params).then(res => {
            this.status = true
            this.data = res.data
            console.log(res.data);
        })
        .catch((err) => {
            // this.isLoading = false
            this.status = false
        })       
    },

    computed: {
        ...mapState('shops', ['current_shop', 'cart']),

        statusStat: function(){
            return ["STANDING", "CANCELLED", "PAYMENT_MADE", "DELIVERED"]
        },
    },


};

</script>

<style scoped>

</style>