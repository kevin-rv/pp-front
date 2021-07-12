<template>
  <navbar/>
  <div class="container p-0 min-vh-100">
    <router-view/>
  </div>
  <Footer/>
</template>
<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "Base",
  components: { Footer, Navbar},
}
</script>
<style lang="scss">
@font-face {
}

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
  background-color: #80ced6;
  background-image: url("../public/img/triangle_background.jpg");
  background-size: cover;
}
#footer {
  background: #454140;
  text-align: center;
  color: white;
}
</style>
