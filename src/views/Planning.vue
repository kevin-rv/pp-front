<template>
<!--            CREATE EVENT -->
  <modal
      title="Create Event"
      ref="modalCreateEvent"
      :action-func="eventAdd"
      action-text="Save"
      button-action-class="btn-info text-white"
  >
    <label>Short Description</label>
    <input type="text" class="form-control" v-model="shortDescription">

    <label>Full Description</label>
    <textarea type="text" rows="8" cols="40" v-model="fullDescription"></textarea>

    <input type="datetime-local" v-model="startDatetime">
    <input type="datetime-local" v-model="endDatetime">
  </modal>

<!--                UPDATE EVENT -->
  <modal
      title="Update Event"
      ref="modalUpdateEvent"
      :action-func="eventUpdate"
      action-text="Save"
      button-action-class="btn-info text-white"
  >
    <template v-slot:header><button type="button" class=" btn bi-trash" @click="openModalDeleteEvent"></button></template>
    <label>Short Description</label>
    <input type="text" class="form-control" v-model="shortDescription">

    <label>Full Description</label>
    <textarea type="text" rows="8" cols="40" v-model="fullDescription"></textarea>

    <input type="datetime-local" v-model="startDatetime">
    <input type="datetime-local" v-model="endDatetime">
  </modal>
<!--                  DELETE EVENT -->
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
    eventToUpdate: {},
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
        headerToolbar: {
          center: 'title',
          right: 'prev,next today',
          left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        selectable: true ,
        firstDay: 1 ,
        // themeSystem: 'bootstrap', // TODO Revoir le theme
        timeZone: 'local',
        nowIndicator: true,
        events: this.fullcalendarCompatibleEvents,
        editable: true,
        navLinks: true,
        weekNumbers: true,
        dayMaxEvents: true,
        eventAdd: function () {console.log(arguments)},
        eventChange: this.eventChange,
        eventRemove: this.removeEvent,
        eventClick: this.eventClick,
        dateClick: this.handleDateClick ,
        eventDidMount: this.eventDidMount,
      }
    }
  },
  methods: {
    ...mapActions({updateAllPlannings: 'updateAllPlannings',updateAllEvents: 'updateAllEvents', updateAllTasks: 'updateAllTasks'}),
    updated() {
      this.planningApi.getPlanningAllEvents(this.$route.params.id)
          .then(data => {
            console.log(data)
            this.updateAllEvents(data)
          })
          .catch(() => {})
    },
    eventChange: function (info) {
      console.log(info)
      let event = EventAdapter.adaptFromFullCalendarEvent(info.event)

      this.planningApi.updateEvent(this.$route.params.id, event)
          .catch(message => {
            console.log(message) // TODO add visual error message please!!! (marc)
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
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalUpdateEvent.$el)
            modal.hide()
          })
          .catch(message => {
            console.log(message) // TODO add visual error message please!!! (marc)
            alert(message)
          })
          .finally(() => {
            this.shortDescription = ''
            this.fullDescription = ''
            this.startDatetime = null
            this.endDatetime = null

          })
    },
    eventDidMount: function(info) {
      new this.$bootstrap.Tooltip(info.el, {   // TODO Tooltip à revoir
        title: info.event.extendedProps.fullDescription,
        delay: { show: 500, hide: 100 }
      });
    },
    eventAdd: function(info) {
      // TODO problème quand on créer un event les infos du dernier update se mette dedans
      console.log({
        shortDescription: this.shortDescription,
        fullDescription: this.fullDescription,
        startDatetime: this.startDatetime,
        endDatetime: this.endDatetime,
      })
      let event = EventAdapter.adaptCreateFullCalendarEvent(info.event)
      this.planningApi.createOneEvent(this.$route.params.id, event)
          .then(() => {
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateEvent.$el)
            modal.hide()
          })
          .catch(message => {
            console.log(message)
            alert(message)
          })

    },
    handleDateClick: function () {
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateEvent.$el)
      modal.show()
    },
    eventClick: function(info) {
      this.eventId = info.event.id
      this.shortDescription = info.event.title
      this.fullDescription = info.event.extendedProps.fullDescription
      this.startDatetime = moment(info.event.start).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
      this.endDatetime = moment(info.event.end).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')

      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalUpdateEvent.$el)
      modal.show()
    },
    removeEvent: function () {
      console.log('remove event')
      // this.calendarOptions.events = {} TODO regler probleme
      // console.log(this.$refs.calendar.getApi())
      // let event = EventAdapter.adaptFromFullCalendarEvent(info.event)
      //
      // this.planningApi.deletePlanning(this.$route.params.id, event)
      //     .then(() => {
      //       let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeletePlanning.$el)
      //       modal.hide()
      //     })
      //     .catch(message => {
      //       console.log(message)
      //     })

    },

    openModalDeleteEvent() {
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteEvent.$el)
      modal.show()
    }
  },
  beforeMount() {
    this.planningApi.getPlanningAllEvents(this.$route.params.id)
        .then(data => {
          console.log(data)
          this.updateAllEvents(data)
        })
        .catch(message => {
          console.log(message)
        })
    this.planningApi.getPlanningAllTasks(this.$route.params.id)
        .then(data => {
          // console.log(data)
          this.updateAllTasks(data)
        })
        .catch(() => {})
  },
  mounted() {
    this.removeEvent()
  }
}
</script>

<style scoped>

</style>