<template>
  <p v-for="(contact, index) in contacts" :key="index">{{contact}}</p>
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