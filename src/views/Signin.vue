<template>
  <div class ="row justify-content-center mt-5">
    <div class="card" style="width: 25rem;">
      <h5 class="card-header">Register</h5>
      <div class="card-body">
        <div class="control-group">
          <!-- Username -->
          <label class="control-label"  for="username">Username</label>
          <div class="controls">
            <input type="text" id="username" name="username" placeholder="name" class="input-xlarge" v-model="name">
          </div>
        </div>
        <div class="control-group">
          <!-- E-mail -->
          <label class="control-label" for="email">E-mail</label>
          <div class="controls">
            <input type="text" id="email" name="email" placeholder="email" class="input-xlarge" v-model="email">
          </div>
        </div>

        <div class="control-group">
          <!-- Password-->
          <label class="control-label" for="password">Password</label>
          <div class="controls">
            <input type="password" id="password" name="password" placeholder="password" class="input-xlarge" v-model="password">
          </div>
        </div>

        <div class="control-group">
          <!-- Password -->
          <label class="control-label"  for="password_confirm">Password (Confirm)</label>
          <div class="controls">
            <input type="password" id="password_confirm" name="password_confirm" placeholder="confirm password" class="input-xlarge">
            <p class="help-block">Please confirm password</p>
          </div>
        </div>
        <button type="button" class="btn btn-primary mb-3" @click="submit">register</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Signin",
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters({planningApi: 'planningApi'})
  },

  methods: {
    submit() {
      this.planningApi.createOneUser(this.name, this.email, this.password)
          .then(() => {
            this.$router.push({name: 'Login'})
          })
          .catch(message => {
            console.log(message)
          })
    }
  }
}
</script>

<style scoped>

</style>