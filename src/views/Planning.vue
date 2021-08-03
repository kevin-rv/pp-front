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
      <datetime v-model="startDatetime" inputClass="form-control" title="Event start" type="datetime" :minuteStep="30" />
    </div>
    <div class="mb-3">
      <label class="form-label">Event end</label>
      <datetime v-model="endDatetime" inputClass="form-control" title="Event end" type="datetime" :minuteStep="30" />
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
    <full-calendar :options="calendarOptions" data-bs-toggle="popover" ref="calendar" id="full-calendar"/>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import '@fullcalendar/core/vdom' // solves problem with Vite
import  FullCalendar from '@fullcalendar/vue3'
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




export default {
  name: "Planning",
  components: {
    Modal,
    FullCalendar,
  },
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
    popoverRefs: {},
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
        eventWillUnmount: this.detachPopover,
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

      // this.updatePopover(info) todo, fix bug when wrap event size

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
            this.updated()
          })
          .catch(message => {
            console.log(message)
          })

    },
    openModalDeleteEvent() {
      let modalUpdate = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateEvent.$el)
      modalUpdate.hide()
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteEvent.$el)
      modal.show()
    },
    attachPopover: function(info) {
      if (info.event.display === 'background') {
        return;
      }
      let popover = new this.$bootstrap.Popover(info.el, {
        title: info.event.title,
        content: () => {
          let content = ''

          content += '<div class="bg-white"><b>Description : <br> </b> ' + info.event.extendedProps.fullDescription + ' <hr/></div>'
          content += '<div class="bg-white"><b>Début de l\'event : </b> <br>  ' + 'Le ' + moment(info.event.start).format('dddd LL à HH:mm') + '<hr/> </div>'
          content += '<div class="bg-white"><b>Fin de l\'évent : </b> <br> ' + 'Le ' + moment(info.event.end).format('dddd LL à HH:mm') + '</div>'

          return content
        },
        html: true,
        trigger: 'hover',
      })
      this.popoverRefs[info.event.id] = popover
    },
    detachPopover: function(info) {
      if (info.event.display === 'background') {
        return;
      }
      this.popoverRefs[info.event.id].disable()
      this.popoverRefs[info.event.id].hide()
    },
    updatePopover: function(info) {
      this.detachPopover(info)
      this.attachPopover(info, this.popoverRefs[info.event.id]._element)
      // console.log(this.popoverRefs[eventId].tip)
      // console.log(this.popoverRefs[eventId].element)
      // console.log(this.popoverRefs[eventId]._element)
      // console.log(this.popoverRefs[eventId]._config)
      // this.popoverRefs[eventId]._config.content = function () {
      //   return 'yo'
      // }
      // this.popoverRefs[eventId].hide()
      // this.popoverRefs[eventId].show()
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
