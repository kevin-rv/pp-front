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
    <div>
    <ul class="list-group">
      <div>
        <label class="form-label">Contact</label>
        <button type="button" class="bi bi-plus-circle border-0 bg-transparent" @click="openModalAddContactEvent"></button>
      </div>
      <li class="list-group-item" v-for="(contact, index) in eventContacts" :key="index">{{contact.name}}
        <button type="button" class="btn btn-danger border-dark me-1 bi bi-x-octagon float-end" onclick="removeContactFromEvent"></button>
      </li>
    </ul>
    </div>
  </modal>

  <modal :title="modalCreateUpdateTaskTitle"
         ref="modalCreateUpdateTask"
         :action-func="modalCreateUpdateTaskAction"
         action-text="Save"
         button-action-class="btn-info text-white"
  >
    <template v-if="modalCreateUpdateTaskDeleteIsActive" v-slot:header><button type="button" class=" btn bi-trash" @click="openModalDeleteTask"></button></template>
    <div class="mb-3">
      <label class="form-label">Short Description</label>
      <input type="text" class="form-control" v-model="shortDescription">
    </div>

    <div class="mb-3">
      <label class="form-label">Done Limit Date</label>
      <datetime v-model="doneLimitDate" inputClass="form-control" title="Done Limit" type="date"/>  <!-- TODO problème recule d'un jour  -->
    </div>
    <div class="mb-3" v-if="checked && done">
      <label class="form-label">Done</label>
      <datetime v-model="done" inputClass="form-control" title="Done Limit" type="date" disabled/>
    </div>
    <div class="form-check" v-if="modalCreateUpdateTaskDeleteIsActive">
      <input class="form-check-input" type="checkbox" id="flexCheck" v-model="checked">
      <label class="form-check-label" for="flexCheck">
        Done
      </label>
    </div>
  </modal>

  <modal
      :title="modalDeleteEventTaskTitle"
      ref="modalDeleteEventTask"
      :action-func="modalDeleteEventTaskAction"
      action-text="delete"
      button-action-class="btn-danger"
  >
    <slot><p>This action is definitive</p></slot>
  </modal>

  <modal
      title="Add contact event"
      ref="modalAddContactEvent"
      :action-func="addContact"
      action-text="save"
      button-action-class="btn-info text-white"
  >
    <div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(contact) in contactListCheckedFromEvent" :key="contact.id">

          <div class="form-check">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" v-model="contact.checked" :checked="contact.checked">  <!-- TODO voir comment le gérer -->
              {{contact.name}}
            </label>
          </div>
        </li>
      </ul>
    </div>

  </modal>

<!-- TODO transformer en composant le offcanvas-->


  <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" aria-labelledby="offcanvasScrollingLabel" ref="offCanvas" >
    <div class="offcanvas-header card-header">
      <h5>
        Task
        <button class="bi bi-plus-circle border-0 bg-transparent" @click="openModalCreateTask"></button>
      </h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body card-body">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#task-undone"
                  type="button"
                  role="tab"
          >
            Task
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#task-done"
                  type="button"
                  role="tab"
          >
            Task done
          </button>
        </li>
      </ul>

      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="task-undone" role="tabpanel">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"
                :class="{warning: taskIsWarning(task)}"
                v-for="(task) in getUndoneTasks" :key="task.id"
                @click="openModalUpdateTask(task)"
            >
              <p>Description: {{task.shortDescription}}</p>
              <p v-if="task.doneLimitDate !== null">done limit date: {{task.doneLimitDate}}</p>
              <div class="form-check" @click.stop="setTaskToDone(task)">
                <label class="form-check-label">
                  <input class="form-check-input" type="checkbox" :checked="task.done !== null">
                  Done
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div class="tab-pane fade" id="task-done" role="tabpanel">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"
                v-for="(task) in getDoneTasks"
                :key="task.id"
                @click="openModalUpdateTask(task)"
            >
              <p>Description: {{task.shortDescription}}</p>
              <p v-if="task.doneLimitDate !== null">done limit date: {{task.doneLimitDate}}</p>
              <p>done date: {{task.done}}</p>
              <div class="form-check" @click.stop="setTaskToUndone(task)">
                <label class="form-check-label">
                  <input class="form-check-input" type="checkbox" :checked="task.done !== null">
                  Done
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>

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
    modalCreateUpdateEventAction: () => {
    },
    modalCreateUpdateEventDeleteIsActive: false,
    modalCreateUpdateTaskTitle: '',
    modalCreateUpdateTaskDeleteIsActive: false,
    modalCreateUpdateTaskAction: () => {
    },
    done: null,
    doneLimitDate: null,
    taskUpdateDeleteId: null,
    modalDeleteEventTaskTitle: '',
    modalDeleteEventTaskAction: () => {

    },
    contact: null,
    holidays: [],
    popoverRefs: {},
    eventContacts: [],
  }),
  computed: {
    ...mapGetters({planningApi: 'planningApi', events: 'allEvents', tasks: 'allTasks', contacts: 'allContacts'}),
    contactListCheckedFromEvent: function () {
      console.log()
        // return un tableau qui contient les contact et te dit si ils sont checkeé
      return this.eventContacts !== null ? this.eventContacts : this.contacts

    },
    checked: {
      get: function () {
        return this.done !== null
      },
      set: function (newValue) {
        this.done = newValue ? new Date() : null
      }
    },
    getDoneTasks: function () {
      return this.tasks.filter(task => task.done !== null)
    },
    getUndoneTasks: function () {
      return this.tasks.filter(task => task.done === null)
    },
    fullcalendarCompatibleEvents: function () {
      let events = [];
      this.events.forEach(value => {
        events.push(EventAdapter.adaptToFullCalendarEvent(value))
      })

      return events.concat(this.holidays)
    },

    calendarOptions: function () {
      return {
        plugins: [dayGridPlugin, timeGrid, interactionPlugin, bootstrapPlugin, listPlugin],
        initialView: 'timeGridWeek',
        locale: 'fr',
        allDaySlot: false,
        headerToolbar: {
          center: 'title',
          right: 'prevYear,prev,today,next,nextYear',
          left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,task',
        },
        selectable: true,
        firstDay: 1,
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
        dateClick: this.openModalCreateNewEvent,
        eventDidMount: this.attachPopover,
        eventWillUnmount: this.detachPopover,
        stickyHeaderDates: 'true',
        slotEventOverlap: false,
        weekText: 'S',
        customButtons: {
          task: {
            text: 'Tache',
            click: () => {
              this.openOffCanvasTask()
            }
          }
        },
        buttonText: {
          today: "Aujourd'hui",
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          list: 'Liste',
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
      updateAllContacts: "updateAllContacts",
      addMessage: 'addMessage'
    }),
    updatedTask() {
      this.planningApi.getPlanningAllTasks(this.$route.params.id)
          .then(data => {
            this.updateAllTasks(data)
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    updatedEvent() {
      this.planningApi.getPlanningAllEvents(this.$route.params.id)
          .then(data => {
            this.updateAllEvents(data)
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
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
            this.updatedEvent()
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
    openModalUpdateEvent: function (info) {
      this.eventId = info.event.id
      this.shortDescription = info.event.title
      this.fullDescription = info.event.extendedProps.fullDescription
      this.startDatetime = moment(info.event.start).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
      this.endDatetime = moment(info.event.end).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss')
      this.eventContacts = info.event.extendedProps.contacts

      this.modalCreateUpdateEventTitle = 'Update Event'
      this.modalCreateUpdateEventAction = this.eventUpdate
      this.modalCreateUpdateEventDeleteIsActive = true;
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateEvent.$el)
      modal.show()
    },
    eventAdd: function () {
      let event = {
        shortDescription: this.shortDescription,
        fullDescription: this.fullDescription,
        startDatetime: moment(this.startDatetime).format(),
        endDatetime: moment(this.endDatetime).format(),
      }
      console.log(event)
      this.planningApi.createOneEvent(this.$route.params.id, event)
          .then(() => {
            this.updatedEvent()
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
      this.planningApi.deleteEvent(this.$route.params.id, this.eventId)
          .then(() => {
            console.log(this.$refs)
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteEventTask.$el)
            modal.hide()
            this.updatedEvent()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })

    },
    openModalDeleteEvent() {
      let modalUpdate = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateEvent.$el)
      modalUpdate.hide()
      this.modalDeleteEventTaskTitle = 'Delete Event'
      this.modalDeleteEventTaskAction = this.removeEvent
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteEventTask.$el)
      modal.show()
    },
    openOffCanvasTask() {
      console.log(this.$refs.offCanvas)
      let offCanvasTask = this.$bootstrap.Offcanvas.getOrCreateInstance(this.$refs.offCanvas)
      offCanvasTask.show()
    },
    attachPopover: function (info) {
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
          content += '<div class="bg-white"><b>Contact : </b> <br> ' + info.event.extendedProps.contacts.map(contact => contact.name)+ '</div>'

          return content
        },
        html: true,
        trigger: 'hover',
      })
      this.popoverRefs[info.event.id] = popover
    },
    detachPopover: function (info) {
      if (info.event.display === 'background') {
        return;
      }
      this.popoverRefs[info.event.id].disable()
      this.popoverRefs[info.event.id].hide()
    },
    updatePopover: function (info) {
      this.detachPopover(info)
      this.attachPopover(info, this.popoverRefs[info.event.id]._element)
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
    },
    // TODO GERER Le champs input qui s'efface quand on appuie sur cancel ou via un button à rajouter
    createTask() {
      let task = {
        shortDescription: this.shortDescription,
        done: this.done !== null ? moment(this.done).format('YYYY-MM-DD') : null,
        doneLimitDate: this.doneLimitDate !== null ? moment(this.doneLimitDate).format('YYYY-MM-DD') : null,
      }
      this.planningApi.createOneTask(this.$route.params.id, task)
          .then(() => {
            this.updatedTask()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateTask.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    openModalCreateTask() {
      this.shortDescription = ''
      this.done = null
      this.doneLimitDate = null
      this.modalCreateUpdateTaskTitle = 'Create Task'
      this.modalCreateUpdateTaskAction = this.createTask
      this.modalCreateUpdateTaskDeleteIsActive = false
      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateTask.$el)
      modal.show()
    },
    // TODO Task interchangable, pouvoir répéter une tache avec un button
    updateTask() {
      let task = {
        id: this.taskUpdateDeleteId,
        shortDescription: this.shortDescription,
        done: this.done !== null ? moment(new Date()).format('YYYY-MM-DD') : null,
        doneLimitDate: this.doneLimitDate !== null ? moment(this.doneLimitDate).format('YYYY-MM-DD') : null,
      }
      this.planningApi.updateTask(this.$route.params.id, task)
          .then(() => {
            this.updatedTask()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateTask.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    setTaskToDone(task) {
      task.done = moment(new Date()).format('YYYY-MM-DD')
      this.planningApi.updateTask(this.$route.params.id, task)
          .then(() => {
            this.updatedTask()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    setTaskToUndone(task) {
      task.done = null
      this.planningApi.updateTask(this.$route.params.id, task)
          .then(() => {
            this.updatedTask()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    openModalUpdateTask(task) {
      this.taskUpdateDeleteId = task.id
      this.shortDescription = task.shortDescription
      this.done = task.done
      this.doneLimitDate = task.doneLimitDate
      this.modalCreateUpdateTaskTitle = 'Update Task'
      this.modalCreateUpdateTaskAction = this.updateTask
      this.modalCreateUpdateTaskDeleteIsActive = true

      let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateTask.$el)
      modal.show()
    },

    deleteTask(){
      this.planningApi.deleteTask(this.$route.params.id, this.taskUpdateDeleteId)
          .then(() => {
            this.updatedTask()
            let modal = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteEventTask.$el)
            modal.hide()
          })
          .catch(message => {
            this.addMessage({
              message: message,
              type: 'danger'
            })
          })
    },
    openModalDeleteTask() {
      let modalUpdate = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateTask.$el)
      modalUpdate.hide()
      this.modalDeleteEventTaskTitle = 'Delete Task'
      this.modalDeleteEventTaskAction = this.deleteTask
      let modalDelete = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalDeleteEventTask.$el)
      modalDelete.show()
    },
    taskIsWarning(task) {
      return moment(task.doneLimitDate).unix() <= moment().unix()
    },

    openModalAddContactEvent() {
      let modalUpdate = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateEvent.$el)
      modalUpdate.hide()
      let modalAddContact = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalAddContactEvent.$el)
      modalAddContact.show()
    },

    addContact() {
      let modalUpdate = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalCreateUpdateEvent.$el)
      modalUpdate.show()
      console.log(this.$refs.modalAddContactEvent.$el)
      let modalAddContact = this.$bootstrap.Modal.getOrCreateInstance(this.$refs.modalAddContactEvent.$el)
      modalAddContact.hide()
    },
    removeContactFromEvent() {

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
        .catch(message => {
          this.addMessage({
            message: message,
            type: 'warning'
          })
        })
    this.planningApi.getAllContact()
        .then(data => {
          this.updateAllContacts(data)
        })
        .catch(message => {
          this.addMessage({
            message: message,
            type: 'warning'
          })
        })
    this.prepareHolidays()

  },
}
</script>

<style>
#full-calendar a {
  color: #2c3e50;
}

li.list-group-item:hover {
  background-color: rgba(239, 235, 235, 0.99);
  cursor: pointer;
}

li.list-group-item.warning {
  background-color: rgba(250, 0, 0, 0.2);
}

li.list-group-item.warning:hover {
  background-color: rgba(250, 0, 0, 0.11);
}


#full-calendar button {
  text-transform: uppercase;
}
</style>
