<template>
  <modal
      :title="modalCreateUpdateEventTitle"
      ref="modalCreateUpdateEvent"
      :action-func="modalCreateUpdateEventAction"
      action-text="Save"
      button-action-class="btn-info text-white"
  >
    <template v-if="modalCreateUpdateEventDeleteIsActive" v-slot:header><button type="button" class=" btn bi-trash" @click="openModalDeleteEvent"></button></template>
    <div class="mb-3">
      <label class="form-label">Short Description</label>
      <input type="text" class="form-control" v-model="shortDescription">
    </div>
    <div class="mb-3">
      <label class="form-label">Full Description</label>
      <textarea type="text" rows="8" class="form-control" v-model="fullDescription"></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Event start</label>
      <input type="datetime-local" class="form-control" v-model="startDatetime">
    </div>
    <div class="mb-3">
      <label class="form-label">Event end</label>
      <input type="datetime-local" class="form-control" v-model="endDatetime">
    </div>
  </modal>

  <modal
      title="Delete Event"
      ref="modalDeleteEvent"
      :action-func="removeEvent"
      action-text="delete"
      button-action-class="btn-danger"
  >
    <slot><p>This action is definitive</p></slot>
  </modal>

  <div style="background-color: white">
    <full-calendar :options="calendarOptions" ref="calendar"/>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGrid from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import {mapActions, mapGetters} from "vuex";
import EventAdapter from "../events/eventAdapter";
import Modal from "../components/Modal";
import moment from 'moment'


export default {
  name: "Planning",
  components: {Modal, FullCalendar},
  data: () => ({
    eventId: null,
    shortDescription: '',
    fullDescription: '',
    startDatetime: null,
    endDatetime: null,
    modalCreateUpdateEventTitle: '',
    modalCreateUpdateEventAction: () => {},
    modalCreateUpdateEventDeleteIsActive: false,
  }),
  computed: {
    ...mapGetters({planningApi: 'planningApi', events: 'allEvents', tasks: 'allTasks'}),
    fullcalendarCompatibleEvents: function () {
      let events = [];
      this.events.forEach(value => {
        events.push(EventAdapter.adaptToFullCalendarEvent(value))
      })

      return events
    },
    calendarOptions: function () {
      return {
        plugins: [ dayGridPlugin, timeGrid, interactionPlugin, bootstrapPlugin, listPlugin ],
        initialView: 'timeGridWeek',
        locale: 'fr',
        allDaySlot: false,
        headerToolbar: {
          center: 'title',
          right: 'prev,next today',
          left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        selectable: true ,
        firstDay: 1 ,
        // themeSystem: 'bootstrap',
        timeZone: 'local',
        nowIndicator: true,
        events: this.fullcalendarCompatibleEvents,
        editable: true,
        navLinks: true,
        weekNumbers: true,
        dayMaxEvents: true,
        eventChange: this.eventChange,
        eventClick: this.openModalUpdateEvent,
        dateClick: this.openModalCreateNewEvent ,
        eventDidMount: this.eventDidMount,
      }
    }
  },
  methods: {
    ...mapActions({
      updateAllPlannings: 'updateAllPlannings',
      updateAllEvents: 'updateAllEvents',
      updateAllTasks: 'updateAllTasks',
      addMessage: 'addMessage'
    }),
    updated() {
      this.planningApi.getPlanningAllEvents(this.$route.params.id)
          .then(data => {
            this.updateAllEvents(data)
          })
          .catch(() => {})
    },
    eventChange: function (info) {
      let event = EventAdapter.adaptFromFullCalendarEvent(info.event)

      this.planningApi.updateEvent(this.$route.params.id, event)
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
            info.revert()
          })
    },
    eventUpdate: function () {
      let event = {
        id: this.eventId,
        shortDescription: this.shortDescription,
        fullDescription: this.fullDescription,
        startDatetime: moment(this.startDatetime).format(),
        endDatetime: moment(this.endDatetime).format(),
      }
      console.log(event)
      this.planningApi.updateEvent(this.$route.params.id, event)
          .then(() => {
            this.updated()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateEvent.$el)
            modal.hide()
          })
          .catch(message => {
            console.log(message)
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    openModalUpdateEvent: function(info) {
      this.eventId = info.event.id
      this.shortDescription = info.event.title
      this.fullDescription = info.event.extendedProps.fullDescription
      this.startDatetime = moment(info.event.start).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
      this.endDatetime = moment(info.event.end).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')

      this.modalCreateUpdateEventTitle = 'Update Event'
      this.modalCreateUpdateEventAction = this.eventUpdate
      this.modalCreateUpdateEventDeleteIsActive = true;
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateEvent.$el)
      modal.show()
    },
    eventAdd: function() {
      let event = {
        shortDescription: this.shortDescription,
        fullDescription: this.fullDescription,
        startDatetime: moment(this.startDatetime).format(),
        endDatetime: moment(this.endDatetime).format(),
      }
      console.log(event)
      this.planningApi.createOneEvent(this.$route.params.id, event)
          .then(() => {
            this.updated()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateEvent.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    openModalCreateNewEvent: function () {
      this.shortDescription = ''
      this.fullDescription = ''
      this.startDatetime = null
      this.endDatetime = null

      this.modalCreateUpdateEventTitle = 'Create Event'
      this.modalCreateUpdateEventAction = this.eventAdd
      this.modalCreateUpdateEventDeleteIsActive = false;
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateEvent.$el)
      modal.show()
    },
    removeEvent: function () {
      this.planningApi.deleteEvent(this.$route.params.id ,this.eventId)
          .then(() => {
            console.log(this.$refs)
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteEvent.$el)
            modal.hide()
            modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateEvent.$el)
            modal.hide()
            this.updated()
          })
          .catch(message => {
            console.log(message)
          })

    },
    openModalDeleteEvent() {
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteEvent.$el)
      modal.show()
    },
    eventDidMount: function(info) {
      new this.$bootstrap.Tooltip(info.el, {   // TODO Tooltip à revoir
        title: info.event.extendedProps.fullDescription,
        delay: { show: 500, hide: 100 }
      });
    },
  },
  beforeMount() {
    this.planningApi.getPlanningAllEvents(this.$route.params.id)
        .then(data => {
          this.updateAllEvents(data)
        })
        .catch(message => {
          console.log(message)
          this.addMessage({
            message: 'event not found',
            type: 'warning'
          })
        })
    this.planningApi.getPlanningAllTasks(this.$route.params.id)
        .then(data => {
          this.updateAllTasks(data)
        })
        .catch(() => {})
  },
}
</script>

<style scoped>
</style>