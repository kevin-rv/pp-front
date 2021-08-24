<template>
  <div id="nav" class="border-bottom border-2 border-white">
    <div class="container p-0">
      <router-link v-if="isLogOut" class="m-3" to="/">Home</router-link>
      <router-link v-if="isLogOut" class="m-3" to="/login">Login</router-link>
      <router-link v-if="isLogOut" class="m-3" to="/signin">Signin</router-link>
      <router-link v-if="isConnected" class="m-3" to="/MenuPlanning">Mes planning</router-link>
      <router-link v-if="isConnected" class="m-3" to="/MenuContacts">Contact</router-link>
      <router-link v-if="isConnected" class="m-3" to="/account">Account</router-link>
      <router-link class="m-3" to="/about">About</router-link>
      <router-link v-if="isConnected"  class="m-3 bi bi-box-arrow-in-right" to="/logout"></router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(['isConnected', 'isLogOut'])
  },
}
</script>
<style scoped lang="scss">

#nav {
  padding: 10px;
  background: #454140;

  a {
    font-weight: bold;
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: red;
    }
  }
}
</style>
