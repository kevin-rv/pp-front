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
        <a href="#" class="btn btn-secondary bi bi-tools"></a>
        <a href="#" class="btn btn-secondary bi bi-x-octagon"></a>
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