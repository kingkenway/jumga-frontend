<template>
    <div class="w3-contentx w3-padding">
        <Header />

        <hr />

        <span class="w3-border w3-round-large w3-padding w3-margin-right w3-margin-top i-block">MERCHANT'S_PERCENTAGE_ON_SALE = 97.4%</span>
        <span class="w3-border w3-round-large w3-padding w3-margin-right w3-margin-top i-block">JUMGA'S_PERCENTAGE_ON_SALE = 2.6%</span>
        <span class="w3-border w3-round-large w3-padding w3-margin-right w3-margin-top i-block">RIDER'S_DELIVERY_PERCENTAGE = 80%</span>
        <span class="w3-border w3-round-large w3-padding w3-margin-right w3-margin-top i-block">JUMGA'S_DELIVERY_PERCENTAGE = 20%</span>

        <span class="w3-padding i-block w3-margin-right w3-margin-top w3-text-white w3-round-large" style="background-color: #DDACCE">
            Jumga's Transactions
        </span>

        <span class="w3-border w3-round-large w3-padding w3-margin-right w3-margin-top i-block">
            Jumga's Earnings:

            <span v-for="(amount, curr, index) in earnings" :key="index">
                <b>{{ curr }}:</b> {{ $helpers.fmtNumber(parseFloat(amount.toFixed(2))) }};
            </span>
        </span>

        <hr />

        <span v-if="isLoading" class="w3-large">
            <center>
                Please Wait...
                <i class="fa fa-circle-notch fa-spin w3-center"></i>
            </center>
        </span>
        <div class="w3-responsive" v-if="transactions.length > 0">
            <table class="w3-table-all">

                <tr>
                    <th>S/N.</th>
                    <th>Amount</th>
                    <th>Currency</th>
                    <th>Beneficiary</th>
                    <th>Transaction Id.</th>
                    <th>Transaction Type</th>
                    <th>Narration</th>
                    <th>Transaction Ref. From Payment</th>
                    <th>Time</th>
                </tr>

                <tr v-for="(tx, index) in transactions"
                    :key="index"
                    :style="tx.beneficiary.email==jumga ? 'background-color:#DDACCE' : ''">

                    <td><b>#{{index+1}}</b></td>
                    <td>{{ $helpers.fmtNumber(parseFloat(tx.amount)) }}</td>
                    <td>{{tx.currency}}</td>
                    <td>{{tx.beneficiary.email}}</td>
                    <td>{{tx.transaction_id}}</td>
                    <td>{{tx.transaction_type}}</td>
                    <td><b>{{tx.narration}}</b></td>
                    <td>{{tx.tx_ref_from_payment.tx_ref}}</td>
                    <td>{{moment(tx.created_at).format('LLL')}} </td>

                </tr>
        
            </table>
        </div>

        
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
// import VueButtonSpinner from 'vue-button-spinner';
import Header from '@/components/Admin/Header.vue'

export default {
    name: "Earnings",

    data() {
        return{
            isLoading: true,
            status: '',
            transactions: [],
            jumga: "jumga@gmail.com",
            earnings: ''
        }
    },

    methods: {
        ...mapActions('shops', ['getTransactions']),
    },
    
    created: function () {
        this.getTransactions().then(res => {
            this.transactions = res.data
            this.isLoading = false

            // console.log(res.data);
        })
        .catch((err) => {
            this.isLoading = false
        })

        // console.log(this.totalAmount);
    },

    watch: {
        transactions (to, from){
            let res = {}
            const spa = this.transactions
                    .map(item => {
                        if ((item.beneficiary.email == this.jumga) && (item.transaction_type == 'credit')){
                            if(Object.prototype.hasOwnProperty.call(res, item.currency)){
                                res[item.currency] += parseFloat(item.amount)
                            }else{
                                res[item.currency] = parseFloat(item.amount)
                            }
                        }
                    })
                    // .reduce((prev,curr) => prev + curr, 0)    
            this.earnings = res
        }
    },


    computed: {
        ...mapState('shops', ['current_shop', 'cart', 'customer', 'server_data']),
    },

    components: {
        Header
    },


};

</script>

<style scoped>

</style>