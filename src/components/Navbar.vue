<template>
  <div id="nav">
    <router-link class="m-3" to="/">Home</router-link>
    <router-link v-if="isLogOut" class="m-3" to="/login">Login</router-link>
    <router-link v-if="isLogOut" class="m-3" to="/signin">Signin</router-link>
    <router-link v-if="isConnected" class="m-3" to="/MenuPlanning">Mes planning</router-link>
    <router-link v-if="isConnected" class="m-3" to="/MenuContacts">Contact</router-link>
    <router-link class="m-3" to="/about">About</router-link>
    <router-link v-if="isConnected"  class="m-3 bi bi-box-arrow-in-right" to="/logout"></router-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(['isConnected', 'isLogOut'])
  }
}
</script>

<style scoped>

</style>