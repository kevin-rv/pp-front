<template>
  <div class="row justify-content-center mt-5 ">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Modifier votre Task</h5>
          <form class="row g-3 justify-content-center mt-1">
            <div class="col-auto">
              <label>Short Description</label>
              <input type="text" v-model="shortDescription">
            </div>
              <div class="input-group date" data-provide="datepicker">
                <input type="date" class="form-control" v-model="doneLimitDate">
              </div>
            <div class="col-auto">
              <input class="form-check-input" type="checkbox" v-model="done" >
              <label class="form-check-label">
                Done
              </label>
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
  name: "UpdateTask",
  data() {
    return {
      shortDescription: '',
      done: null,
      doneLimitDate: null,
    }
  },
  computed: {
    ...mapGetters({planningApi: 'planningApi'})
  },

  methods: {
    submit() {
      this.planningApi.updateTask(this.$route.params.id, this.shortDescription, this.done, this.doneLimitDate)
          .then(() => {
            this.$router.push({name: 'MenuTasks'})
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