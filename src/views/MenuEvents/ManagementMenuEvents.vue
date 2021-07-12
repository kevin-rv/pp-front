<template>
<!--  <div>-->
<!--    <router-link :to="{name: 'EventCreate'}" class="btn btn-secondary bi bi-plus-circle"/>-->
<!--    <p>Vos Events</p>-->
<!--    <div class="card" v-for="(event, index) in events" :key="index">-->
<!--      <div class="card-body">-->
<!--        <h5 class="card-title">Special title treatment</h5>-->
<!--        <p class="card-text">{{event}}</p>-->
<!--        <a href="#" class="btn btn-secondary bi bi-eye-fill"></a>-->
<!--        <a href="#" class="btn btn-secondary bi bi-tools"></a>-->
<!--        <a href="#" class="btn btn-secondary bi bi-x-octagon"></a>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div class="card-group">
    <div class="card">
<!--      <div class="card-title">{{event.shortDescription}}</div>-->
      <h5 class="text-center">Event<router-link :to="{name: 'EventCreate'}" class="btn btn-secondary bi bi-plus-circle"/></h5>
      <div class="card-body list-group-item"  v-for="(event, index) in events" :key="index">
        <div class="card-header btn btn-secondary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">{{event.shortDescription}}
          <button class="btn btn-secondary bi bi-eye-fill"></button>
          <button class="btn btn-secondary bi bi-tools"></button>
          <button class="btn btn-secondary bi bi-x-octagon"></button>
          <ul class="list-group list-group-horizontal">
            <li class="list-group-item">{{event.startDatetime}}</li>
            <li class="list-group-item">{{event.endDatetime}}</li>
          </ul>
        </div>
        <p class="card-text collapse" id="collapseExample">{{event.fullDescription}}<br>{{event.contacts}}</p>
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item">{{event.startDatetime}}</li>
          <li class="list-group-item">{{event.endDatetime}}</li>
        </ul>
      </div>
<!--      test-->
      <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
    </div>
<!--    card 2 -->
    <div class="card">
      <h5 class="text-center">Event finish</h5>
      <div class="card-body list-group-item">
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