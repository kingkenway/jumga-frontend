<template>
    <div class="w3-large box w3-third w3-padding w3-centerx">
        <router-link :to="{ name: 'shop_detail', params: {slug: shop.sub_domain} }">

            
        </router-link>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: "ProductTemplate",

    props: {
        shop: Object,
    },

    methods: {
        
    },

    created: function () {
        
    },


    computed: {
        ...mapState('auth', ['base_url']),
        ...mapState('shops', ['default_image']),
        ...mapGetters('auth', ['user', ]),
    },


  
};
</script>

<style scoped>
/* .box{
    border: 1px solid #ccc    
} */

img{
    width: 100%;
    max-height: 250px;
}

.logo{
    width: 50px;
    border-radius: 50%;
    margin-top: -30px;
}

</style>