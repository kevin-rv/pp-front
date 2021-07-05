<template>
  <div>
<!--    <router-link :to="{name: ''}" class="btn btn-secondary bi bi-plus-circle"/>-->
    <p>Vos Tasks</p>
    <div class="card" v-for="(event, index) in events" :key="index">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">{{event}}</p>
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
  name: "ManagementMenuEvents",
  computed: {
    ...mapGetters({planningApi: 'planningApi', events: 'allEvents'})
  },
  methods: {
    ...mapActions({updateAllEvents: 'updateAllEvents'}),
  },
  beforeMount() {
    this.planningApi.getPlanningAllEvents(this.$route.params.id)
        .then(data => {
          console.log(data)
          this.updateAllEvents(data)
        })
        .catch(() => {
        })
  }
}
</script>

<style scoped>

</style>