<template>
  <modal :title="modalCreateUpdateContactTitle"
         ref="modalCreateUpdateContact"
         :action-func="modalCreateUpdateContactAction"
         action-text="Save"
         button-action-class="btn-info text-white"
  >
    <template v-if="modalCreateUpdateContactDeleteIsActive" v-slot:header><button type="button" class=" btn bi-trash" @click="openModalDeleteContact"></button></template>
    <div class="mb-3">
      <label class="col-form-label">Name *</label>
      <input type="text" class="form-control" v-model="name">
    </div>
    <div class="mb-3">
      <label class="col-form-label">PhoneNumber *</label>
      <input type="text" class="form-control" v-model="phoneNumber">
    </div>
    <div class="mb-3">
      <label class="col-form-label">Home</label>
      <input type="text" class="form-control" v-model="home">
    </div>
    <div class="mb-3">
      <label class="col-form-label">Birthday *</label>
      <datetime v-model="birthday" inputClass="form-control" title="Birthday" />
    </div>
    <div class="mb-3">
      <label class="col-form-label">Email</label>
      <input type="text" class="form-control" v-model="email">
    </div>
    <div class="mb-3">
      <label class="col-form-label">Relationship</label>
      <input type="text" class="form-control" v-model="relationship">
    </div>
    <div class="mb-3">
      <label class="col-form-label">Work</label>
      <input type="text" class="form-control" v-model="work">
    </div>
  </modal>

  <modal title="Delete Contact"
         ref="modalDeleteContact"
         :action-func="deleteContact"
         action-text="Delete"
         button-action-class="btn-danger"
  >
    <p>Do you want delete your contact ?</p>
  </modal>

  <!--              CREATE-->
  <modal :title="modalCreateUpdatePlanningTitle"
         ref="modalCreateUpdatePlanning"
         :action-func="modalCreateUpdatePlanningAction"
         action-text="Save"
         button-action-class="btn-info text-white"
  >
    <template v-if="modalCreateUpdatePlanningDeleteIsActive" v-slot:header><button type="button" class=" btn bi-trash" @click="openModalDeletePlanning"></button></template>
    <label class="col-form-label">Name</label>
    <input type="text" class="form-control" v-model="name">
  </modal>
  <!--            DELETE-->
  <modal title="Delete planning"
         ref="modalDeletePlanning"
         :action-func="deletePlanning"
         action-text="Delete"
         button-action-class="btn-danger"
  >
    <p>Do you want delete your planning ?</p>
  </modal>

  <div id="nav" class="border-bottom border-2 border-white">
    <div class="container p-0">
      <router-link v-if="isLogOut" class="m-3" to="/">Home</router-link>
      <router-link v-if="isLogOut" class="m-3" to="/login">Login</router-link>
      <router-link v-if="isLogOut" class="m-3" to="/signin">Signin</router-link>
      <div v-if="isConnected" class="me-3" style="display: inline-block">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"  aria-expanded="false">
              Mes Planning
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
              <li @click="openModalCreatePlanning"><a id="newPlanning" class="dropdown-item text-center">New planning</a> <hr class="dropdown-divider"></li>
              <li  v-for="(planning, index) in plannings" :key="index">
                <a class="dropdown-item text-dark">{{planning.name}}
                  <div class="d-flex float-end">
                    <router-link :to="{name: 'planning', params: { id: planning.id }}">
                      <i class="bi-eye m-2"></i>
                    </router-link>
                    <i class="bi-gear" @click="openModalUpdatePlanning(planning)"></i></div>
                </a><hr class="dropdown-divider">
              </li>
              <li class="text-center"><router-link v-if="isConnected" to="/MenuPlanning">Mes planning</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-if="isConnected" style="display: inline-block">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Contact
            </a>
            <ul class="dropdown-menu overflow-auto" aria-labelledby="navbarDarkDropdownMenuLink">
              <li @click="openModalCreateContact"><a id="newContact" class="dropdown-item">New contact</a> <hr class="dropdown-divider"></li>
              <li class="text-center"><router-link v-if="isConnected"  to="/MenuContacts">Liste de contacts</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
      <router-link v-if="isConnected" class="m-3" to="/account">Account</router-link>
      <router-link v-if="isConnected"  class="m-3 bi bi-box-arrow-in-right" to="/logout"></router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Modal from "./Modal";
import moment from "moment";

export default {
  name: "Navbar",
  components: {
    Modal,
  },
  data:() => ({
    name: '',
    phoneNumber: '',
    home: '',
    birthday: null,
    email: '',
    relationship: '',
    work: '',
    modalCreateUpdateContactTitle: '',
    modalCreateUpdateContactAction: () => {},
    modalCreateUpdateContactDeleteIsActive: false,
    contactUpdateDeleteId: null,

    planningIdToDelete: null,  // TODO Nettoyage a faire
    planningToUpdate: {},
    modalCreateUpdatePlanningTitle: '',
    modalCreateUpdatePlanningDeleteIsActive: false,
    modalCreateUpdatePlanningAction: () => {},
  }),
  computed: {
    ...mapGetters({isConnected: 'isConnected',planningApi: 'planningApi', plannings: 'allPlannings', isLogOut: 'isLogOut', contacts: 'allContacts'})
  },
  methods: {
    ...mapActions({
      updateAllPlannings: 'updateAllPlannings',
      updateAllContacts: 'updateAllContacts',
      addMessage: 'addMessage'
    }),
    updatedPlanning() {
      this.planningApi.getAllPlannings()
          .then(data => {
            this.updateAllPlannings(data)
          })
          .catch(() => {})
    },
    updated() {
      this.planningApi.getAllContact()
          .then(data => {
            this.updateAllContacts(data)
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    createContact() {
      let contact = {
        name: this.name,
        phoneNumber: this.phoneNumber,
        home: this.home,
        birthday: moment(this.birthday).format('YYYY-MM-DD'),
        email: this.email,
        relationship: this.relationship,
        work: this.work,
      }
      this.planningApi.createOneContact(contact)
          .then(() => {
            this.updated()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateContact.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    openModalCreateContact() {
      this.name = ''
      this.phoneNumber = ''
      this.home = ''
      this.birthday = null
      this.email = ''
      this.relationship = ''
      this.work = ''
      this.modalCreateUpdateContactTitle = 'Create Contact'
      this.modalCreateUpdateContactAction = this.createContact
      this.modalCreateUpdateContactDeleteIsActive = false
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateContact.$el)
      modal.show()
    },
    updateContact() {
      let contact = {
        name: this.name,
        phoneNumber: this.phoneNumber,
        home: this.home,
        birthday: moment(this.birthday).format('YYYY-MM-DD'),
        email: this.email,
        relationship: this.relationship,
        work: this.work,
      }
      this.planningApi.updateContact(this.contactUpdateDeleteId ,contact)
          .then(() => {
            this.updated()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateContact.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    openModalUpdateContact(contact) {
      this.contactUpdateDeleteId = contact.id
      this.name = contact.name
      this.phoneNumber = contact.phoneNumber
      this.home = contact.home
      this.birthday = contact.birthday
      this.email = contact.email
      this.relationship = contact.relationship
      this.work = contact.work
      this.modalCreateUpdateContactTitle = 'Update Contact'
      this.modalCreateUpdateContactAction = this.updateContact
      this.modalCreateUpdateContactDeleteIsActive = true;
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateContact.$el)
      modal.show()
    },
    deleteContact() {
      this.planningApi.deleteContact(this.contactUpdateDeleteId)
          .then(() => {
            this.updated()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteContact.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    openModalDeleteContact() {
      let modalUpdate = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateContact.$el)
      modalUpdate.hide()
      let modalDelete = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteContact.$el)
      modalDelete.show()
    },

    openModalCreatePlanning() {
      this.name = ''
      this.modalCreateUpdatePlanningTitle = 'Create Planning'
      this.modalCreateUpdatePlanningAction = this.createPlanning
      this.modalCreateUpdatePlanningDeleteIsActive = false
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdatePlanning.$el)
      modal.show()
    },
    createPlanning() {
      this.planningApi.createOnePlanning(this.name)
          .then(() => {
            this.updatedPlanning()
            this.name = ''
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdatePlanning.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    openModalUpdatePlanning(planningToUpdate) {
      this.planningToUpdate = planningToUpdate
      this.name = planningToUpdate.name
      this.modalCreateUpdatePlanningTitle = 'Update Planning'
      this.modalCreateUpdatePlanningAction = this.updatePlanning
      this.modalCreateUpdatePlanningDeleteIsActive = true
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdatePlanning.$el)
      modal.show()
    },
    updatePlanning() {
      this.planningApi.updatePlanning(this.planningToUpdate.id, this.name)
          .then(() => {
            this.updatedPlanning()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdatePlanning.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
          .finally(() => {
            this.name = ''
          })
    },
    openModalDeletePlanning(planningIdToDelete) {
      this.planningIdToDelete = planningIdToDelete
      let modalUpdate = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdatePlanning.$el)
      modalUpdate.hide()
      let modalDelete = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeletePlanning.$el)
      modalDelete.show()
    },
    deletePlanning() {
      this.planningApi.deletePlanning(this.planningToUpdate.id)
          .then(() => {
            this.updatedPlanning()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeletePlanning.$el)
            modal.hide()
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
    if (this.isConnected) {

      this.planningApi.getAllContact()
          .then(data => {
            this.updateAllContacts(data)
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'warning'
            })
          })
      this.planningApi.getAllPlannings()
          .then(data => {
            this.updateAllPlannings(data)
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    }

  },
}
</script>
<style scoped lang="scss">

a.dropdown-item.text-dark:active {
  background: #c5c0c0;
}
a#newPlanning.dropdown-item:active {
  background: #c5c0c0;
}
a#newContact.dropdown-item:active {
  background: #c5c0c0;
}
#newPlanning  {
  color: red !important;
}
#newContact {
  color: red !important;
}
a.dropdown-item:hover {
  color: red !important;
}
#nav {
  padding: 10px;
  background: #454140;
li a {
  color: black;
}
  a.nav-link.dropdown-toggle {
    color: white;
  }
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
