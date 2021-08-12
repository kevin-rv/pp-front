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

  <div>
    <div class="card">
      <div class="card-header text-center">
        <h5>
          Menu Contact
          <button class="bi bi-plus-circle border-0 bg-transparent" @click="openModalCreateContact"></button>
        </h5>
      </div>
      <div class="card-body overflow-auto" style="max-height: 100vh;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="(contact, index) in contacts" :key="index" @click="openModalUpdateContact(contact)">
            {{contact.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!--  TODO AJOUTER TRI ALPHABETIQUE-->
<!--  TODO Problème jour -->
<!--  TODO Barre de recherche https://v3.vuejs.org/guide/transitions-list.html#staggering-list-transitions
                              https://v3.vuejs.org/guide/a11y-semantics.html#buttons-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Modal from "../../components/Modal";
import moment from 'moment'

export default {
  name: "ManagementMenuContacts",
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
  }),
  computed: {
    ...mapGetters({planningApi: 'planningApi', plannings: 'allPlannings', contacts: 'allContacts'}),
  },
  methods: {
    ...mapActions({
      updateAllPlannings: 'updateAllPlannings',
      updateAllContacts: 'updateAllContacts',
      addMessage: 'addMessage'
    }),
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
      console.log(contact)
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
  },
  beforeMount() {
    this.planningApi.getAllContact()
        .then(data => {
          console.log(data)
          this.updateAllContacts(data)
        })
        .catch(message => {
          this.addMessage({
            message: message,
            type: 'warning'
          })
        })
  },
}
</script>

<style scoped>

li.list-group-item:hover {
  background-color: rgba(239, 235, 235, 0.99);
  cursor: pointer;
}
</style>
