<template>
    <div class="w3-sidebar w3-sidebar-none w3-padding">
        <router-link class="item" v-for="route in routes" :key="route.path" :to="route.path">
            
            <div v-if="route.path != 'add' ">
                <div class="item">
                    {{ fix(route.name) }}
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "Sidebar",

    data() {
        return{
            routes: this.$router.options.routes[5]['children'],
        }
    },

    methods: {
        fix: function (val) {
            return val.replace('_', ' ')
        }
    },

    created: function () {
        // console.log(this.routes[5]['children']);
    },

  
};
</script>

<style scoped>
.sidebar{
  float: left;
}

.item{
  margin-top: 18px;
}

.item{
  text-transform: capitalize;
}

.w3-sidebar-none{
  background-color: #f0f0f0;
}
</style>