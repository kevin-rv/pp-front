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
      <textarea type="text" rows="6" class="form-control" v-model="fullDescription"></textarea>
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

  <popover :title="shortDescription" :content="fullDescription + startDatetime + endDatetime"></popover>

  <div style="background-color: white">
    <full-calendar :options="calendarOptions" data-bs-toggle="popover" ref="calendar" id="full-calendar"/>
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
import PublicHolidayApi from "../api/publicHolidayApi";
import Popover from "../components/Popover"




export default {
  name: "Planning",
  components: {Modal, FullCalendar, Popover},
  data: () => ({
    eventId: null,
    shortDescription: '',
    fullDescription: '',
    startDatetime: null,
    endDatetime: null,
    modalCreateUpdateEventTitle: '',
    modalCreateUpdateEventAction: () => {},
    modalCreateUpdateEventDeleteIsActive: false,
    holidays: [],
  }),
  computed: {
    ...mapGetters({planningApi: 'planningApi', events: 'allEvents', tasks: 'allTasks'}),
    fullcalendarCompatibleEvents: function () {
      let events = [];
      this.events.forEach(value => {
        events.push(EventAdapter.adaptToFullCalendarEvent(value))
      })

      return events.concat(this.holidays)
    },
    calendarOptions: function () {
      return {
        plugins: [ dayGridPlugin, timeGrid, interactionPlugin, bootstrapPlugin, listPlugin ],
        initialView: 'timeGridWeek',
        locale: 'fr',
        allDaySlot: false,
        headerToolbar: {
          center: 'title',
          right: 'prevYear,prev,today,next,nextYear',
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
        eventDidMount: this.attachPopover,
        stickyHeaderDates: 'true',
        slotEventOverlap: false,
        weekText: 'S',
        buttonText: {
          today:    "Aujourd'hui",
          month:    'Mois',
          week:     'Semaine',
          day:      'Jour',
          list:     'Liste'
        },
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
        },
        views: {
          dayGridMonth: { // name of view
            dayHeaderContent: (args) => {
              moment.locale('fr');
              return moment(args.date).format('dddd')
            }
          },
          timeGridWeek: { // name of view
            dayHeaderContent: (args) => {
              moment.locale('fr');
              return moment(args.date).format('dddd Do')
            }
          },
        },
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
    openModalCreateNewEvent: function (dateClick) {
      this.shortDescription = ''
      this.fullDescription = ''
      this.startDatetime = moment(dateClick.date).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
      this.endDatetime = moment(dateClick.date).add(30, 'minutes').utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')

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
    attachTooltip: function(info) {
      if (!info.event.extendedProps.fullDescription) {
        return
      }
      new this.$bootstrap.Tooltip(info.el, {   // TODO Tooltip à revoir
        title: info.event.extendedProps.fullDescription,
        delay: { show: 500, hide: 100 }
      });
    },

    attachPopover: function(info) {
      new this.$bootstrap.Popover(info.el, {
      });
    },
    prepareHolidays: function () {
      let ph = new PublicHolidayApi();
      ph.getHolidays()
          .then(holidays => {
            let holidayEvents = []
            holidays.forEach(holiday => {
              holidayEvents.push(EventAdapter.adaptHolidayToFullCalendarEvent(holiday))
            })
            this.holidays = holidayEvents
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'warning'
            })
          })
    }
  },
  beforeMount() {
    this.planningApi.getPlanningAllEvents(this.$route.params.id)
        .then(data => {
          this.updateAllEvents(data)
        })
        .catch(message => {
          this.addMessage({
            message: message,
            type: 'warning'
          })
        })
    this.planningApi.getPlanningAllTasks(this.$route.params.id)
        .then(data => {
          this.updateAllTasks(data)
        })
        .catch(() => {

        })
    this.prepareHolidays()

  },
  mounted() {
    this.$bootstrapActivatePopovers()
  }
}
</script>

<style>
#full-calendar a {
  color: #2c3e50;
}

#full-calendar button {
  text-transform: uppercase;
}
</style>