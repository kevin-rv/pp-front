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

<!--  ouvrir le offcanvas au moment de la connexion ? -->
<!--    test-->
<!--  <nav class="navbar navbar-light bg-light fixed-top">-->
<!--    <div class="container-fluid">-->
<!--      <a class="navbar-brand" href="#">Offcanvas navbar</a>-->
<!--      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">-->
<!--        <span class="navbar-toggler-icon"></span>-->
<!--      </button>-->
<!--      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">-->
<!--        <div class="offcanvas-header">-->
<!--          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>-->
<!--          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>-->
<!--        </div>-->
<!--        <div class="offcanvas-body">-->
<!--          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">-->
<!--            <li class="nav-item">-->
<!--              <a class="nav-link active" aria-current="page" href="#">Home</a>-->
<!--            </li>-->
<!--            <li class="nav-item">-->
<!--              <a class="nav-link" href="#">Link</a>-->
<!--            </li>-->
<!--            <li class="nav-item dropdown">-->
<!--              <a class="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">-->
<!--                Dropdown-->
<!--              </a>-->
<!--              <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">-->
<!--                <li><a class="dropdown-item" href="#">Action</a></li>-->
<!--                <li><a class="dropdown-item" href="#">Another action</a></li>-->
<!--                <li>-->
<!--                  <hr class="dropdown-divider">-->
<!--                </li>-->
<!--                <li><a class="dropdown-item" href="#">Something else here</a></li>-->
<!--              </ul>-->
<!--            </li>-->
<!--          </ul>-->
<!--          <form class="d-flex">-->
<!--            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">-->
<!--            <button class="btn btn-outline-success" type="submit">Search</button>-->
<!--          </form>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </nav>-->
<!-- test 2-->
<!--  <nav class="navbar navbar-expand d-flex flex-column align-items-start" id="sidebar">-->
<!--    <a href="#" class="navbar-brand text-light mt-5">-->
<!--      <div class="display-5">THANOS</div>-->
<!--    </a>-->
<!--    <ul class="navbar-nav d-flex flex-column mt-5 w-100">-->
<!--        <li class="nav-item w-100">-->
<!--            <a href="#" class="nav-link text-light">-->
<!--                Home-->
<!--            </a>-->
<!--        </li>-->
<!--    </ul>-->

<!--  </nav>-->
<!--test 3 -->
<!--  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Enable body scrolling</button>-->
<!--  <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" ref="offCanvas" >-->
<!--    <div class="offcanvas-header">-->
<!--      <h5>-->
<!--        logo-->
<!--      </h5>-->
<!--      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>-->
<!--    </div>-->
<!--    <div class="offcanvas-body card-body">-->
<!--      <ul class="nav nav-tabs" role="tablist">-->
<!--        <li class="nav-item" role="presentation">-->
<!--        </li>-->
<!--        <li class="nav-item" role="presentation">-->

<!--        </li>-->
<!--      </ul>-->

<!--      <div class="tab-content" id="myTabContent">-->
<!--        <div class="tab-pane fade show active" id="task-undone" role="tabpanel">-->
<!--          <ul class="list-group list-group-flush">-->
<!--            <li class="list-group-item"-->

<!--            >-->
<!--             <h5>Planning</h5>-->
<!--              <a href="#">planning 1</a>-->
<!--            </li>-->
<!--            <li class="list-group-item" >-->
<!--              Tasks-->
<!--            </li>-->
<!--            <li class="list-group-item" >-->
<!--              Account-->
<!--            </li>-->
<!--            <li class="list-group-item" >-->
<!--              Exit-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->

<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
<!--  <vs-sidebar></vs-sidebar>-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Modal from "./Modal";
import moment from "moment";
// import {vsSidebar} from "vuesax";

export default {
  name: "Navbar",
  components: {
    Modal
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
    openOffCanvas() {
      console.log(this.$refs.offCanvas)
      let offCanvas = this.$bootstrap.Offcanvas.getOrCreateInstance(this.$refs.offCanvas)
      offCanvas.show()
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
