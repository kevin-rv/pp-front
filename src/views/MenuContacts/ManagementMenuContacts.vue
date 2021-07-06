<template>
  <div class="row justify-content-center mt-5 ">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Menu Contact <router-link :to="{name: 'ContactCreate'}" class="btn btn-secondary bi bi-plus-circle"/></h5>
<!--          <router-link :to="{name: 'ContactCreate'}" class="btn btn-secondary bi bi-plus-circle"/>-->
          <p v-for="(contact, index) in contacts" :key="index">{{contact.name}} <router-link :to="{name: 'ContactUpdate', params: { id: contact.id }}" class="btn btn-secondary bi bi-tools"/></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ManagementMenuContacts",
  computed: {
    ...mapGetters({planningApi: 'planningApi', plannings: 'allPlannings', contacts: 'allContacts'})
  },
  methods: {
    ...mapActions({updateAllPlannings: 'updateAllPlannings',updateAllContacts: 'updateAllContacts'}),
  },
  beforeMount() {
    this.planningApi.getAllContact()
        .then(data => {
          console.log(data)
          this.updateAllContacts(data)
        })
        .catch(() => {})
  }
}
</script>

<style scoped>

</style>