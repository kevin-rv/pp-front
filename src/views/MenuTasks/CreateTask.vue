<template>
  <div class="row justify-content-center mt-5 ">
    <datepicker v-model="picked" />
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Créer votre Task</h5>
          <form class="row g-3 justify-content-center mt-1">
            <div class="col-auto">
              <label>Short Description</label>
              <input type="text" v-model="shortDescription">
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="flexCheckDisabled" v-model="done" disabled>
              <label class="form-check-label" for="flexCheckDisabled">
                Done
              </label>
              <div class="input-group date" data-provide="datepicker">
                <input type="date" class="form-control" v-model="doneLimitDate">
              </div>
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

import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
const picked = ref(new Date())


export default {
  name: "CreateTask",
  components: {
    Datepicker,
  },
  data() {
    return {
      picked,
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
      this.planningApi.createOneTask(this.$route.params.id, this.shortDescription, this.done, this.doneLimitDate)
          .then(() => {
            this.$router.push({name: 'MenuTasks', params: {id: this.$route.params.id}})
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