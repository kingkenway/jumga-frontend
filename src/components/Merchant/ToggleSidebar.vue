<template>
    <div class="i-block">
        <label
        class="w3-large w3-hide-large w3-padding-small w3-border w3-round" style="color: #657881"
        id="navbarButton"
        @click="w3_open">&#9776;
        </label>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "ToggleSidebar",

  data() {
    return{
      data: ""
    }
  },

  methods:{
    ...mapMutations('auth', ['toggleSidebarStatus']),

    w3_open() {
      this.toggleSidebarStatus("w3-show");
    },
  },
  
};
</script>
