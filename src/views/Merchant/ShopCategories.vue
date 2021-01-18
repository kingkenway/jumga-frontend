<template>
  <div class="w3-main w3-move-left w3-padding">
    
    <div class="w3-row">
      <div class="w3-col l9 w3-xlarge">
        Shop Categories
      </div>

      <div class="w3-round w3-center w3-card w3-col l3 w3-padding w3-text-white dark-blue" style="display: inline-block;">
            <router-link :to="{ name: 'add_shop_category' }" class="">
                + Add
            </router-link>
        </div>
    </div>

    <hr />


    
  </div>
</template>

<script>
export default {
  name: "ShopCategories",

  data() {
    return{
      data: ""
    }
  }
};
</script>
