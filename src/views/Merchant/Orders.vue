<template>
  <div class="w3-main w3-move-left w3-padding">
    <div class="w3-row">
      <div class="w3-col l9 w3-xlarge">
        <ToggleSidebar />
        Your Orders
      </div>
      
    </div>

    <hr />

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
                <td>Shop Name</td>
                <td>Customer Name</td>
                <td>Customer Contact</td>
                <td>Customer Email</td>
                <td>Customer City</td>
                <td class="sp">Time</td>
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
    <div class="w3-center" v-else>
        <br /><br />
        <div class="">
        <svg width="50" height="38" viewBox="0 0 50 38" fill="#6B6F76" class="sc-pIgJL cwcLgV"><path d="M15.0076 31.2798L15.3611 31.6334L15.7147 31.2798L45.0022 1.9923C45.9607 1.03382 47.4783 1.03382 48.4368 1.9923C49.3952 2.95079 49.3952 4.46837 48.4368 5.42686L17.0786 36.7554L17.0784 36.7556C16.1199 37.7141 14.5728 37.7141 13.6143 36.7556L1.21887 24.3602C0.260378 23.4017 0.260378 21.8841 1.21887 20.9256C2.17735 19.9671 3.69494 19.9671 4.65343 20.9256L15.0076 31.2798Z"></path></svg>
        </div>
        <br />
        No Orders received yet.              
    </div>

    <br><br>



    
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ToggleSidebar from "@/components/Merchant/ToggleSidebar.vue"

export default {
  name: "Orders",

  data() {
    return{
      data: "",
      orders: ""
    }
  },

   methods: {
    ...mapActions('shops', ['merchantOrders']),

    getSum: function(val){
      let res = val
                .map(item => parseFloat(item.item_price) * parseInt(item.quantity))
                .reduce((prev,curr) => prev + curr, 0)
      return res
    }
   },

  created: function () {
      this.merchantOrders(this.user.id).then(res => {
          this.orders = res.data

          console.log(res.data);
      })
      .catch((err) => {
          // this.isLoading = false
      })
  },

  components:{
    ToggleSidebar
  },

  computed: {
    ...mapState('shops', ['shops']),
    ...mapGetters('auth', ['user', ]),

    statusStat: function(){
        return ["STANDING", "CANCELLED", "PAYMENT_MADE", "DELIVERED"]
    },
  },

  

  
};
</script>

<style scoped>

.sp{
  max-width:100%;
  white-space:nowrap;
}

</style>