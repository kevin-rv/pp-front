<template>
  <div class ="row justify-content-center mt-5">
    <div class="card" style="width: 25rem;">
      <h5 class="card-header">Register</h5>
      <div class="card-body">
        <div class="control-group">
          <!-- Username -->
          <label class="form-label">Username</label>
          <div class="mb-3">
            <input type="text" class="form-control" v-model="name">
          </div>
        </div>
        <div class="control-group">
          <!-- E-mail -->
          <label class="form-label">E-mail</label>
          <div class="mb-3">
            <input type="email" class="form-control" v-model="email">
          </div>
        </div>

        <div class="control-group">
          <!-- Password-->
          <label class="form-label">Password</label>
          <div class="mb-3">
            <input type="password" class="form-control" v-model="password">
          </div>
        </div>

        <div class="control-group">
          <!-- Password -->
          <label class="form-label" >Password (Confirm)</label>
          <div class="mb-3">
            <input type="password" class="form-control" v-model="confirmPassword">
            <p class="help-block">Please confirm password
              <span v-if="confirmPassword === password && confirmPassword === ''" class="passwordEmpty">Empty</span>
              <span v-else-if="confirmPassword === password" class="passwordMatching">Matching</span>
              <span v-else class="passwordNotMatching">Not Matching</span>
            </p>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Birthday</label>
          <datetime v-model="birthday" inputClass="form-control" title="Birthday" type="date" />  <!-- TODO problème recule d'un jour  -->
        </div>
        <button type="button" class="btn btn-primary mb-3" @click="submit">register</button>
      </div>
    </div>
  </div>
<!--  TODO à essayer pour la confirmation de mdp https://stackoverflow.com/questions/21727317/how-to-check-confirm-password-field-in-form-without-reloading-page/21727518-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from 'moment'

export default {
  name: "Signin",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthday: null,
    }
  },
  computed: {
    ...mapGetters({planningApi: 'planningApi'})
  },

  methods: {
    ...mapActions({
      addMessage: 'addMessage'
    }),
    submit() {
      this.planningApi.createOneUser(this.name, this.email, this.password, this.confirmPassword, moment(this.birthday).format('YYYY-MM-DD'))
          .then(() => {
            this.$router.push({name: 'Login'})
          })
          .catch(message => {
            console.log(message)
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
  .passwordMatching {
    color: green;
  }
  .passwordEmpty {
    color: orange;
  }
  .passwordNotMatching {
    color: red;
  }
</style>
