<template>
  <div class="row justify-content-center mt-5 ">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Créer votre Event</h5>
          <form class="row g-3 justify-content-center mt-1">
            <div class="col-auto">
              <label>Short Description</label>
              <input type="text" class="form-control" v-model="shortDescription">
            </div>
            <div class="col-auto text-center">
              <label>Full Description</label>
              <textarea type="text" rows="8" cols="40" v-model="fullDescription"></textarea>
            </div>
              <div class="input-group date">
                <input type="datetime-local" class="form-control" v-model="startDatetime">
              </div>
            <div class="input-group date">
              <input type="datetime-local" class="form-control" v-model="endDatetime">
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-primary mb-3 bi bi-check" @click="submit"></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CreateEvent",
  data() {
    return {
      shortDescription: '',
      fullDescription: '',
      startDatetime: null,
      endDatetime: null,
      contacts: [],
    }
  },
  computed: {
    ...mapGetters({planningApi: 'planningApi'})
  },

  methods: {
    submit() {
      this.planningApi.createOneEvent(this.$route.params.id, this.shortDescription, this.fullDescription, this.startDatetime, this.endDatetime, this.contacts)
          .then(() => {
            this.$router.push({name: 'MenuEvents'})
          })
          .catch(message => {
            console.log(message)
          })
    }
  }
}
</script>

<style scoped>

</style>