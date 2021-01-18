<template>
    <div class="w3-sidebar w3-sidebar-none w3-padding w3-bar-block w3-collapse"
    v-bind:class="sidebarStatus">
        <label class="w3-large w3-hide-large w3-padding-small w3-border w3-round" style="color: #657881"
        @click="w3_close()">&#9776;</label>

        <router-link class="" v-for="route in routes" :key="route.path" :to="{  name: route.name }">
            
            <div v-if="!exceptions.includes(route.name)">
                <div class="item">
                    <b>{{ fix(route.name) }}</b>
                </div>
            </div>
        </router-link>

        <!-- <router-link :to="{ name: 'overview' }" class="item">
            Overview
        </router-link> -->
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

export default {
    name: "Sidebar",

    data() {
        return{
            routes: this.$router.options.routes[5]['children'],
            exceptions: [
                'add_shop',
                'add_shop_category',
                'shop_detail',
                'add_product',
            ],

            sidebarStyle: "",
        }
    },

    methods: {
        ...mapMutations('auth', ['toggleSidebarStatus']),

        fix: function (val) {
            return val.replace('_', ' ')
        },

        w3_open() {
            this.toggleSidebarStatus("w3-show");
        },

        w3_close() {
            this.toggleSidebarStatus("w3-hide");
        },
    },

    created: function () {
        // console.log(this.routes[5]['children']);
    },

    computed: {
        ...mapState('auth', ['sidebarStatus']),
    },

  
};
</script>

<style scoped>
a.router-link-exact-active > div > div {
  transition: background-color 1.0s ease;
  /* border-left: 5px solid #2083ae; */
  color: #fff;
  padding: 4px;
  border-radius: 8px;
  background-color: #1d4476cb;
  font-weight: 800;
  border-left: none;;
}

.sidebar{
  float: left;
}

.item{
  margin-top: 18px;
  font-size: 20px;
  border-left: 5px dotted #857f91cb;
  border-radius: 2px;
  text-transform: capitalize;
  padding: 4px;
  letter-spacing: 2px;
}

/* .w3-sidebar-none{
  border: 1px solid #f0f0f0;
  border-radius: 18px;
} */
</style>