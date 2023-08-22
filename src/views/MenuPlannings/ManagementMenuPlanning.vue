<template>
<!--              CREATE-->
  <modal :title="modalCreateUpdatePlanningTitle"
         ref="modalCreateUpdatePlanning"
         :action-func="modalCreateUpdatePlanningAction"
         action-text="Save"
         button-action-class="btn-info text-white"
  >
    <label class="col-form-label">Name</label>
    <input type="text" class="form-control" v-model="name">
  </modal>
<!--            DELETE-->
  <modal title="Delete planning"
         ref="modalDeletePlanning"
         :action-func="deletePlanning"
         action-text="Delete"
         button-action-class="btn-danger"
  >
 <p>Do you want delete your planning ?</p>
  </modal>

<!--                CARD-->
  <div class="card rounded-3">
    <div class="card-header text-center">
      <h2>
        GESTION PLANNING
        <button  class="bi bi-plus-circle border-0 bg-transparent" @click="openModalCreatePlanning"></button>
      </h2>
    </div>
    <div class="card-body rounded-3" v-for="(planning, index) in plannings" :key="index">
      <div class="d-flex flex-row list-group-item p-2">
        <div class="flex-grow-1">
          <h5 class="card-title flex-grow-1" style="word-break: break-all">{{ planning.name }}</h5>
        </div>
        <router-link :to="{name: 'planning', params: { id: planning.id }}" class="btn btn-info text-white mt-2 mb-2 border-dark me-1">Voir</router-link>
        <button type="button" class="btn btn-secondary border-dark mt-2 mb-2 me-1 bi-gear" @click="openModalUpdatePlanning(planning)"></button>
        <button type="button" class="btn btn-danger mt-2 mb-2 border-dark me-1 bi bi-x-octagon" @click="openModalDeletePlanning(planning.id)"></button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Modal from "../../components/Modal";

export default {
  name: "ManagementMenuPlanning",
  components: {
    Modal,
  },

  data: () => ({
    name: '',
    planningIdToDelete: null,
    planningToUpdate: {},
    modalCreateUpdatePlanningTitle: '',
    modalCreateUpdatePlanningAction: () => {},
  }),
  computed: {
    ...mapGetters({planningApi: 'planningApi', plannings: 'allPlannings'})
  },
  methods: {
    ...mapActions({
      updateAllPlannings: 'updateAllPlannings',
      addMessage: 'addMessage'
    }),
    updated() {
      this.planningApi.getAllPlannings()
          .then(data => {
            this.updateAllPlannings(data)
          })
          .catch(() => {})
    },
    openModalCreatePlanning() {
      this.name = ''
      this.modalCreateUpdatePlanningTitle = 'Create Planning'
      this.modalCreateUpdatePlanningAction = this.createPlanning
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdatePlanning.$el)
      modal.show()
    },
    openModalUpdatePlanning(planningToUpdate) {
      this.planningToUpdate = planningToUpdate
      this.name = planningToUpdate.name
      this.modalCreateUpdatePlanningTitle = 'Update Planning'
      this.modalCreateUpdatePlanningAction = this.updatePlanning
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdatePlanning.$el)
      modal.show()
    },
    openModalDeletePlanning(planningIdToDelete) {
      this.planningIdToDelete = planningIdToDelete
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeletePlanning.$el)
      modal.show()
    },
    createPlanning() {
      this.planningApi.createOnePlanning(this.name)
          .then(() => {
            this.updated()
            this.name = ''
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdatePlanning.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    updatePlanning() {
      this.planningApi.updatePlanning(this.planningToUpdate.id, this.name)
          .then(() => {
            this.updated()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdatePlanning.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
          .finally(() => {
            this.name = ''
          })
    },

    deletePlanning() {
      this.planningApi.deletePlanning(this.planningIdToDelete)
          .then(() => {
            this.updated()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeletePlanning.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
  },
  beforeMount() {
    this.planningApi.getAllPlannings()
        .then(data => {
          this.updateAllPlannings(data)
        })
        .catch(message => {
          this.addMessage({
            message: message,
            type: 'danger'
          })
        })
  },
}
</script>

<style scoped>
</style>
