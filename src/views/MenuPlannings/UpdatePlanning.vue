<template>
  <div class="row justify-content-center mt-5 ">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">Modifier votre Planning</h5>
          <form class="row g-3 justify-content-center mt-1">
            <div class="col-auto">
              <label>Name</label>
              <input type="text" v-model="name">
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-primary mb-3 bi bi-check" @click="submit"></button>
              <!--              <a href="#" class="btn btn-primary mt-3 bi bi-check" @click="submit"></a>-->
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
  name: "UpdatePlanning",
  data() {
    return {
      name: this.name,
    }
  },
  computed: {
    ...mapGetters({planningApi: 'planningApi'})
  },

  methods: {
    submit() {
      this.planningApi.updatePlanning(this.$route.params.id,this.name)
          .then(() => {
            this.$router.push({name: 'MenuPlanning'})
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