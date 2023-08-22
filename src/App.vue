<template>
  <navbar/>
  <alert-center/>
  <button v-if="isConnected" class="btn btn-outline-secondary bi-list float-start ms-3" style="z-index: 1" data-bs-toggle="offcanvas" data-bs-target="#sidebar"></button>
  <div v-if="isConnected" class="h-100">
    <SideBar2/>
  </div>
  <div class="container-fluid p-0 min-vh-100" style="animation-direction: normal">
    <router-view/>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import AlertCenter from  "./components/AlertCenter";
import SideBar2 from "./components/sidebar/SideBar2";
import {mapGetters} from "vuex";

export default {
  name: "Base",
  components: {SideBar2, AlertCenter, Navbar},
  computed: {
    ...mapGetters({isConnected: 'isConnected'})
  }
}
</script>
<style lang="scss">
@font-face {
}

@import "assets/styles/app";

html {
  font-family: 'Choco cooky', sans-serif;
  font-style: normal;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  //text-align: center;
  color: #2c3e50;
  //background-color: #80ced6;
  //background-image: url("../public/img/triangle_background.jpg");
  //background-size: cover;
}

</style>
