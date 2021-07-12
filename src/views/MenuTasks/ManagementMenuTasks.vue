<template>
  <div>
    <router-link :to="{name: 'TaskCreate'}" class="btn btn-secondary bi bi-plus-circle"/>
    <p>Vos Tasks</p>
    <div class="card" v-for="(task, index) in tasks" :key="index">
      <div class="card-body">
        <p class="card-text">{{task}}</p>
        <router-link :to="{name: 'TaskUpdate', params: { planningId: $route.params.id, taskId: task.id }}" class="btn btn-secondary bi bi-tools"/>
        <a href="#" class="btn btn-danger bi bi-x-octagon"></a>
      </div>
    </div>
  </div>

  <div class="card-group">
    <div class="card">
      <h5 class="text-center">Task<router-link :to="{name: 'TaskCreate'}" class="btn btn-secondary bi bi-plus-circle"/></h5>
      <div class="card-body list-group-item"  v-for="(task, index) in tasks" :key="index">
        <p class="card-text">{{task}}</p>
      </div>
    </div>
    <div class="card">
      <h5 class="text-center">Task finish</h5>
      <div class="card-body list-group-item">
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