<template>
  <modal
      title="Delete Account"
      ref="modalDeleteUser"
      :action-func="modalDeleteUserAction"
      action-text="delete"
      button-action-class="btn-danger"
  >
    <slot><p>This action is definitive</p></slot>
  </modal>

  <div>
    <div class="card">
      <div class="card-header text-center">
        <h5>  <!-- TODO  update à terminer  gestion de mdp -->
          My Account
        </h5>
        <button class="bi bi-pencil-fill border-0 bg-transparent" @click="dislockInputUser" ></button>
      </div>
      <div class="card-body">
        <div>
          <!-- Username -->
          <label class="form-label">Username</label>
          <div class="mb-3">
            <input type="text" class="form-control" v-model="name" :disabled="disabled">
          </div>
        </div>
        <div>
          <!-- E-mail -->
          <label class="form-label">E-mail</label>
          <div class="mb-3"> <!-- TODO problème bad credential après l'update -->
            <input type="text" class="form-control" v-model="email" :disabled="disabled">
          </div>
        </div>

        <div v-if="updateInput">
          <!-- Old Password-->
          <label class="form-label">Old Password</label>
          <div class="mb-3">
            <input type="password" class="form-control" v-model="password">
          </div>
        </div>
        <div v-if="updateInput">

          <!-- Password-->
          <label class="form-label">New Password</label>
          <div class="mb-3">
            <input type="password" class="form-control" v-model="password">
          </div>
        </div>

        <div v-if="updateInput">
          <!-- Password -->
          <label class="form-label" >Password (Confirm)</label>  <!-- TODO à voir comment le gérer -->
          <div class="mb-3">
            <input type="password" class="form-control" >
            <p class="help-block">Please confirm password</p>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Birthday</label>
          <datetime v-model="birthday" inputClass="form-control" title="Birthday" type="date" :disabled="disabled" />  <!-- TODO problème recule d'un jour   -->
        </div>

        <div>
          <!-- Phone Number -->
          <label class="form-label">Phone</label>
          <div class="mb-3">
            <input type="text" class="form-control" v-model="phoneNumber" :disabled="disabled">
          </div>
        </div>

        <div>
          <!-- Home -->
          <label class="form-label">Home</label>
          <div class="mb-3">
            <input type="text" class="form-control" v-model="home" :disabled="disabled">
          </div>
        </div>

        <div>
          <!-- Work -->
          <label class="form-label">Work</label>
          <div class="mb-3">
            <input type="text" class="form-control" v-model="work" :disabled="disabled">
          </div>
        </div>
        <div class="row">
          <button type="button" class="btn btn-danger  mt-2 mb-2 me-1" v-if="updateInput" @click="openModalDeleteAccount">Delete Account</button>
        </div>
        <div class="row">
          <button type="button" class="btn btn-info  text-white mt-2 mb-2 me-1" v-if="updateInput" @click="updateInputUser">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Modal from "../components/Modal";
import moment from "moment";
import router from "../router";

export default {
  name: "Account",
  components: {
    Modal
  },
  data: () => ({
    id: null,
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthday: null,
    work: '',
    home: '',
    updateInput: false,
    disabled: true,
    modalDeleteUserAction: () => {
    },
    userIdToDelete: null,

  }),


  computed: {
    ...mapGetters({
      planningApi: 'planningApi'
    })
  },
  methods: {
    ...mapActions({
      updateUser: 'updateUser',
      addMessage: 'addMessage'
    }),

    dislockInputUser () {
        this.updateInput = true
        this.disabled = false
    },
    updateInputUser () {
      this.planningApi.updateUser(this.name, this.email, moment(this.birthday).format('YYYY-MM-DD'), this.phoneNumber, this.home, this.work )
          .then(data => {
            this.updateUser(data)
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })

      this.updateInput = false
      this.disabled = true
    },

    openModalDeleteAccount () {
      this.modalDeleteUserAction = this.deleteUser
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteUser.$el)
      modal.show()
    },
    deleteUser () {
      this.planningApi.deleteUser()
          .then(data => {
            this.updateUser(data)
            router.push('Login')
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
  },

  beforeMount() {
    this.planningApi.getUser()
        .then(data => {
          this.updateUser(data)
          console.log(data)
          this.name = data.name
          this.email = data.email
          this.work = data.work
          this.birthday = data.birthday
          this.phoneNumber = data.phoneNumber
          this.home = data.home
        })
        .catch(message => {
          this.addMessage({
            message: message,
            type: 'danger'
          })
        })
  }
}
</script>

<style scoped>

</style>
