<template>
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


export default {
  name: "Planning",
  components: {FullCalendar},
  data: () => ({

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
        locale: 'fr' ,
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
        eventAdd: function () {console.log(arguments)},
        eventChange: this.eventChange,
        eventRemove: function () {console.log(arguments)},
        eventClick: this.eventClick,
        eventDidMount: this.eventDidMount,
      }
    }
  },
  methods: {
    ...mapActions({updateAllPlannings: 'updateAllPlannings',updateAllEvents: 'updateAllEvents', updateAllTasks: 'updateAllTasks'}),
    eventChange: function (info) {
      let event = EventAdapter.adaptFromFullCalendarEvent(info.event)

      this.planningApi.updateEvent(this.$route.params.id, event)
          .catch(message => {
            console.log(message) // TODO add visual error message please!!! (marc)
            info.revert()
          })
    },
    eventDidMount: function(info) {
      new this.$bootstrap.Tooltip(info.el, {
        title: info.event.extendedProps.fullDescription,
        delay: { show: 500, hide: 100 }
      });
    },
    eventClick: function(info) {
      console.log(info)
      // Ouvrir une modale dans laquelle tu peux éditer les infos de l'event
    },
    removeEvent: function () {
      console.log('remove event')
      this.calendarOptions.events = {}
      console.log(this.$refs.calendar.getApi())

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