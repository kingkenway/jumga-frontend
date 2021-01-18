<template>
    <div class="w3-contentx w3-padding">
        <Header />
        <hr />

        <span v-if="isLoading" class="w3-large">
            <center>
                Please Wait...
                <i class="fa fa-circle-notch fa-spin w3-center"></i>
            </center>
        </span>
        <div class="w3-responsive" v-if="orders.length > 0">
            <table class="w3-table-all">

                <tr>
                    <td>Order ID.</td>
                    <td>Reference ID.</td>
                    <td class="sp">Order Items</td>
                    <td class="sp">Sub Total</td>
                    <td>Delivery</td>
                    <td class="sp">Total Amount</td>
                    <td>Status</td>
                    <td class="sp">Shop Name</td>
                    <td class="sp">Customer Name</td>
                    <td>Customer Contact</td>
                    <td>Customer Email</td>
                    <td>Customer City</td>
                    <td>Time</td>
                </tr>

                <tr v-for="(order, index) in orders" :key="index">
                    <td><b>#{{order.id}}</b></td>
                    <td>{{order.reference_id}}</td>

                    <td class="sp">
                        <div v-for="(o, i) in order.items" :key="i">
                            <!-- <div class="w3-center">({{i+1}})</div> -->
                            <div>
                            <b>Name:</b> {{o.product.name}}
                            <b>Amount:</b> {{$helpers.fmtNumber(parseFloat(o.item_price))}}
                            <b>Qty.:</b> {{o.quantity}}
                            </div>
                        </div>
                    </td>
                    
                    <td class="sp">{{order.shop.country.currency}} {{ $helpers.fmtNumber( order.total_amount - (order.total_amount-getSum(order.items)) ) }}</td>

                    <td class="sp">
                    {{order.shop.country.currency}} {{ $helpers.fmtNumber(order.total_amount-getSum(order.items)) }}
                    </td>
                    
                    
                    <td class="sp">{{order.shop.country.currency}} {{$helpers.fmtNumber(order.total_amount)}}</td>
                    <td>
                        <span :class="statusStat[order.status] == 'PAYMENT_MADE' ? 'w3-green': '' ">
                            {{ statusStat[order.status] }}
                        </span>
                    </td>
                    
                    <td class="sp">{{order.shop.name}}</td>
                    <td class="sp">{{order.customer_name}}</td>
                    <td>{{order.customer_contact}}</td>
                    <td>{{order.customer_email}}</td>
                    <td>{{order.customer_city}}</td>
                    <td class="sp">{{moment(order.created_at).format('LLL')}} </td>
                </tr>
            </table>
        </div>
    

    <br><br>


        
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
// import VueButtonSpinner from 'vue-button-spinner';
import Header from '@/components/Admin/Header.vue'

export default {
    name: "Orders",

    data() {
        return{
            isLoading: true,
            status: '',
            orders: '',
            jumga: "jumga@gmail.com"
        }
    },

    methods: {
        ...mapActions('shops', ['getAllOrders']),

        getSum: function(val){
            let res = val
                    .map(item => parseFloat(item.item_price) * parseInt(item.quantity))
                    .reduce((prev,curr) => prev + curr, 0)
            return res
        }
    },
    
    created: function () {
        this.getAllOrders().then(res => {
            this.orders = res.data
            this.isLoading = false
        })
        .catch((err) => {
            this.isLoading = false
        })
    },


    computed: {
        ...mapState('shops', ['current_shop', 'cart', 'customer', 'server_data']),
        statusStat: function(){
            return ["STANDING", "CANCELLED", "PAYMENT_MADE", "DELIVERED"]
        },       
    },

    components: {
        Header
    },


};

</script>

<style scoped>

.sp{
  max-width:100%;
  white-space:nowrap;
}
</style>