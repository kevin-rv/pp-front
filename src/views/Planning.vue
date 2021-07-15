<template>
  <div>
<!--    <router-link :to="{name: 'MenuTasks'}" class="btn btn-secondary">Task</router-link>-->
<!--    <router-link :to="{name: 'MenuEvents'}" class="btn btn-secondary">Event</router-link>-->
<!--    <h5>EVENT</h5>-->
<!--  <p v-for="(event, index) in events" :key="index">{{event}}</p>-->
<!--    <h5>TASK</h5>-->
<!--  <p v-for="(task, index) in tasks" :key="index">{{task}}</p>-->
    <card-planning></card-planning>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CardPlanning from "../components/CardPlanning";

export default {
  name: "Planning",
  components: {CardPlanning},
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
        .catch(message => {
          console.log(message)
        })
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