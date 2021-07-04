<template>
  <div>
    <h5>EVENT</h5>
  <p v-for="(event, index) in events" :key="index">{{event}}</p>
    <h5>TASK</h5>
  <p v-for="(task, index) in tasks" :key="index">{{task}}</p>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Planning",
  computed: {
    ...mapGetters({planningApi: 'planningApi', events: 'allEvents', tasks: 'allTasks'})
  },
  methods: {
    ...mapActions({updateAllPlannings: 'updateAllPlannings',updateAllEvents: 'updateAllEvents', updateAllTasks: 'updateAllTasks'}),
  },
  beforeMount() {
    this.planningApi.getPlanningAllEvents(this.$route.params.id)
        .then(data => {
          console.log(data)
          this.updateAllEvents(data)
        })
        .catch(() => {})
    this.planningApi.getPlanningAllTasks(this.$route.params.id)
        .then(data => {
          // console.log(data)
          this.updateAllTasks(data)
        })
        .catch(() => {})
  }
}
</script>

<style scoped>

</style>