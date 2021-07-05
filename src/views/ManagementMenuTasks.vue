<template>
  <div>
    <router-link :to="{name: 'TaskCreate'}" class="btn btn-secondary bi bi-plus-circle"/>
    <p>Vos Tasks</p>
    <div class="card" v-for="(task, index) in tasks" :key="index">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">{{task}}</p>
        <a href="#" class="btn btn-secondary bi bi-eye-fill"></a>
        <a href="#" class="btn btn-secondary bi bi-tools"></a>
        <a href="#" class="btn btn-secondary bi bi-x-octagon"></a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ManagementMenuTasks",
  computed: {
    ...mapGetters({planningApi: 'planningApi', tasks: 'allTasks'})
  },
  methods: {
    ...mapActions({updateAllTasks: 'updateAllTasks'}),
  },
  beforeMount() {
    this.planningApi.getPlanningAllTasks(this.$route.params.id)
        .then(data => {
          console.log(data)
          this.updateAllTasks(data)
        })
        .catch(() => {
        })
  }
}
</script>

<style scoped>

</style>