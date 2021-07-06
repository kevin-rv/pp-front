<template>
  <navbar/>
  <message/>
  <router-view/>
  <Footer/>
</template>
<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Message from "./components/message";
export default {
  name: "Base",
  components: {Message, Footer, Navbar},
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
}
#footer {
  background: darkgrey;
  text-align: center;
  margin-top: 50px;
}
#nav {
  padding: 10px;
  background: darkgrey;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: red;
    }
  }
}
</style>
