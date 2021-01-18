<template>
    <div class="w3-contentx w3-padding">

       <Topbar :current_shop="current_shop" />

        <br>
        
        <div class="w3-margin-top">
            <div class="w3-center">
                <div class="">
                    <svg width="50" height="38" viewBox="0 0 50 38" fill="#6B6F76" class="sc-pIgJL cwcLgV"><path d="M15.0076 31.2798L15.3611 31.6334L15.7147 31.2798L45.0022 1.9923C45.9607 1.03382 47.4783 1.03382 48.4368 1.9923C49.3952 2.95079 49.3952 4.46837 48.4368 5.42686L17.0786 36.7554L17.0784 36.7556C16.1199 37.7141 14.5728 37.7141 13.6143 36.7556L1.21887 24.3602C0.260378 23.4017 0.260378 21.8841 1.21887 20.9256C2.17735 19.9671 3.69494 19.9671 4.65343 20.9256L15.0076 31.2798Z"></path></svg>
                </div>
                <br />
                Your Order has been successfully placed!
                <br />
                <span class="w3-xlarge">
                    
                    <router-link
                        :to="{ name: 'customerorders', params: { email: customer.customer_email, contact: customer.customer_contact } }">
                        <u>Click here to track your order</u>
                    </router-link>

                </span>
            </div>
        </div>

        <hr />



    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
// import VueButtonSpinner from 'vue-button-spinner';
import Topbar from '@/components/Shop/Topbar.vue'

export default {
    name: "Success",

    data() {
        return{
            isLoading: true,
            status: '',
        }
    },

    methods: {
        ...mapActions('shops', ['placeOrder', 'orderPayment']),
    },
    
    created: function () {
    },

    computed: {
        ...mapState('shops', ['current_shop', 'cart', 'customer', 'server_data']),
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