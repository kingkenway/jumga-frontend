<template>
    <div
        :style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' +this.$helpers.setImg(current_shop.banner_image, 1)+  ')' }"
        class="w3-padding w3-xlarge header">

        <div class="i-block logo-box">
            <img class="logo" :src="this.$helpers.setImg(current_shop.logo)" alt="" >
        </div>
        <div class="i-block w3-padding name">
            <slot></slot> {{current_shop.name}}
            <br />
            <span class="w3-medium">
                {{this.$helpers.checkDescription(current_shop.description)}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Topbar",

    props: {
        current_shop: Object,
    },
}
</script>

<style scoped>
.header{
    color: #fff;
    /* height: 150px; */
    border-radius: 8px;
    /* border: 3px dashed #ccc;
    display: inline-block; */
    /* margin: 0 auto;
    text-align: center */
}

.name{
    vertical-align: middle;
    /* margin-top: 30px; */
    font-weight: 800;
    letter-spacing: 2px;
    width: 80%;
}

/* .logo-block{
    width: 20%;
    vertical-align: middle;
} */

.logo{
    /* margin-top: 30px; */
    height: 80px;
    width: 80px;
    border-radius: 50%;
}


.pdt-img{
    margin-top: 30px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
}

.product{
    border: 1px solid #f3efee;
}

@media only screen and (max-width: 900px) {
    .name{
        font-size: 20px;
        overflow-wrap: break-word;
    }

    .logo{
        height: 50px;
        width: 50px;
    }
}
</style>