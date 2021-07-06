<template>
  <div>
    <router-link :to="{name: 'planningCreate'}" class="btn btn-secondary bi bi-plus-circle"/>
    <p>Vos Planning</p>
    <div class="card" v-for="(planning, index) in plannings" :key="index">
      <h5 class="card-header">{{ planning.name }} </h5>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <router-link :to="{name: 'planning', params: { id: planning.id }}" class="btn btn-secondary bi bi-eye-fill"/>
        <router-link :to="{name: 'PlanningUpdate', params: { id: planning.id }}" class="btn btn-secondary bi bi-tools"/>
<!--        <router-link :to="{name: 'PlanningDelete', params: { id: planning.id }}" @click="submit" class="btn btn-danger bi bi-x-octagon"/>-->
<!--        <button type="button" class="btn btn-danger mb-3 bi bi-x-octagon" @click="submit"></button>-->
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ManagementMenuPlanning",
  computed: {
    ...mapGetters({planningApi: 'planningApi', plannings: 'allPlannings'})
  },
  methods: {
    ...mapActions({updateAllPlannings: 'updateAllPlannings'}),

    submit() {
      this.planningApi.deletePlanning(this.$route.params.id)
          .then(() => {
            this.$router.push({name: 'MenuPlannings'})
          })
          .catch(message => {
            console.log(message)
          })
    }
  },
  beforeMount() {
    this.planningApi.getAllPlannings()
        .then(data => {
          console.log(data)
          this.updateAllPlannings(data)
        })
        .catch(() => {})
  }

}
</script>

<style scoped>

</style>