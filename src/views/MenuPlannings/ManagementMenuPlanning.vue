<template>
      <div class="card rounded-3">
        <div class="card-header text-center">
          <h2>
            GESTION PLANNING
<!--            <router-link :to="{name: 'planningCreate'}" class="btn-lg bi bi-plus-circle float-end"/>-->
            <button  class="bi bi-plus-circle border-0 bg-transparent" @click="openModalCreatePlanning"></button>
            <modal title="Créer votre planning"
                   ref="modalCreatePlanning"
                   :action-func="createPlanning"
                   action-text="Save"
            >
              <label class="col-form-label">Name</label>
              <input type="text" class="form-control" v-model="name">
            </modal>
          </h2>
        </div>
        <div class="card-body rounded-3" v-for="(planning, index) in plannings" :key="index">
          <div class="d-flex flex-row list-group-item p-2">
            <div class="flex-grow-1">
              <h5 class="card-title flex-grow-1">{{ planning.name }}</h5>
            </div>
            <router-link :to="{name: 'planning', params: { id: planning.id }}" class="btn btn-info text-white border-dark me-1">Voir</router-link>
            <router-link :to="{name: 'PlanningUpdate', params: { id: planning.id }}" class="btn btn-secondary border-dark me-1" >Modifier</router-link>
            <popover title="supression"
                     content="<div class='btn btn-sm btn-danger' onclick='planningApi.deletePlanning(planning.id)'>confirm</div>"
                     icon-class="bi bi-x-octagon"
                     button-class="btn-danger"
                     extra-class="border-dark">
            </popover>
            <!--        TODO  popover-->
            <!--            @click="planningApi.deletePlanning(planning.id)"-->
          </div>

        </div>
      </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Modal from "../../components/Modal";
import Popover from "../../components/Popover";

export default {
  name: "ManagementMenuPlanning",
  components: {Popover,Modal},
  data: () => ({
    name: '',
  }),
  computed: {
    ...mapGetters({planningApi: 'planningApi', plannings: 'allPlannings'})
  },
  methods: {
    ...mapActions({updateAllPlannings: 'updateAllPlannings'}),
    updated() {
      this.planningApi.getAllPlannings()
          .then(data => {
            console.log(data)
            this.updateAllPlannings(data)
          })
          .catch(() => {})
    },
    openModalCreatePlanning() {
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreatePlanning.$el)
      modal.show()
    },
    createPlanning() {
      this.planningApi.createOnePlanning(this.name)
          .then(() => {
            this.updated()
            this.name = ''
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreatePlanning.$el)
            modal.hide()
          })
          .catch(message => {
            console.log(message)
          })
    },
  },
  beforeMount() {
    this.planningApi.getAllPlannings()
        .then(data => {
          console.log(data)
          this.updateAllPlannings(data)
        })
        .catch(() => {
        })
  },
  mounted() {
    console.log(this.$refs.modalCreatePlanning)
    this.$bootstrapActivatePopovers()
  },
}
</script>

<style scoped>
.card {
  margin-top: 150px;
}
</style>