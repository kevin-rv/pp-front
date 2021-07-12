<template>
  <div class="row justify-content-center mt-5 ">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Modifier votre Task</h5>
          <form class="row g-3 justify-content-center mt-1">
            <div class="col-auto">
              <label>Short Description</label>
              <input type="text" v-model="computedTask.shortDescription">
            </div>
              <div class="input-group date" data-provide="datepicker">
                <input type="date" class="form-control" v-model="computedTask.doneLimitDate">
              </div>
            <div class="col-auto">
              <input class="form-check-input" type="checkbox" v-model="computedTask.done" >
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
  props: {
    planningId: null,
    taskId: null,
  },
  computed: {
    ...mapGetters({planningApi: 'planningApi', task: 'task'}),
    computedTask() {
      return this.task(this.taskId)
    }
  },
  methods: {
    submit() {
      this.planningApi.updateTask(this.$route.params.planningId, this.$route.params.taskId, this.computedTask.shortDescription, this.computedTask.done, this.computedTask.doneLimitDate)
          .then(() => {
            this.$router.push({name: 'MenuTasks', params: {id: this.$route.params.planningId}})
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