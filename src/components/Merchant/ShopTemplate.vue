<template>
    <div class="w3-large box w3-col l4 m6 s12 w3-padding w3-centerx">
        <router-link :to="{ name: 'shop_detail', params: {slug: shop.sub_domain} }">

            <div
                class="w3-round dark"
                :style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' +this.$helpers.setImg(shop.banner_image, 1)+  ')' }"
                style="border: 1px solid #f3efee;">
                <!-- <img :src="this.$helpers.setImg(shop.banner_image, 1)" alt="" > -->

                <div class="w3-padding w3-margin-bottom">

                    <img class="logo" :src="this.$helpers.setImg(shop.logo)" alt="" >

                    <p><b>{{shop.name}}</b></p>

                    <div class="w3-border w3-round-large w3-margin-right margin-top w3-small i-block w3-padding-small">
                        DELIVERY: {{user.country.currency}} {{shop.delivery_fee}}
                    </div>


                    <div class="w3-border w3-margin-right margin-top w3-round-large w3-small i-block w3-padding-small">
                        STATUS: 
                        <span v-if="shop.is_active">
                            Verified
                        </span>
                        <span v-else>Not Verified</span>
                    </div>
                </div>

            </div>

        </router-link>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: "ShopTemplate",

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
.box{
    color: aliceblue;
}

img{
    width: 100%;
    max-height: 250px;
}

.logo{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: -30px;
}

/* .dark{
    background: ,;
} */

</style>