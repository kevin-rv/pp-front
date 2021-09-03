<template>
  <div class ="row justify-content-center mt-5">
    <div class="card" style="width: 25rem;">
      <h5 class="card-header">Login</h5>
      <div class="card-body">
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
          <label for="floatingPassword">Password</label>
        </div>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary mt-3" @click="login">Login</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import api from "../api/planningApi";
import {mapActions} from 'vuex';


export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    ...mapActions({updateToken: 'updateToken', addMessage: 'addMessage'}),
    login() {
      api.login(this.email, this.password).then(token => {
        this.updateToken(token)
        if (token != null) {
          this.$router.push({name: 'MenuPlanning'})
        }
      }).catch(message => {
        this.addMessage({
          message: message,
          type: 'danger'
        })
      })
    },
  }
}
</script>

<style scoped>

</style>
