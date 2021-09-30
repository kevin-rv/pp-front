<template>
  <navbar/>
  <alert-center/>
  <div class="container-fluid p-0 min-vh-100">
    <router-view/>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import AlertCenter from "./components/AlertCenter";

export default {
  name: "Base",
  components: {AlertCenter, Navbar},
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
