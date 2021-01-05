<template>
    <div class="w3-padding-top">
        <router-link :to="{ name: 'shop_detail', params: {slug: shop.sub_domain} }">

            <div class="">
                {{shop.name}}
            </div>

        </router-link>
    </div>
</template>

<script>
export default {
    name: "ShopTemplate",

    props: {
        shop: Object,
    },

    created: function () {
        
    },

  
};
</script>

<style scoped>
</style>