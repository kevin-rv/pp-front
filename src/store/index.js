import { createStore } from 'vuex'

import planningApi from "../api/planningApi";

export default createStore({
    state: {
        planningApi: planningApi.setToken(localStorage.getItem('token') || ''),
        token: localStorage.getItem('token') || '',
        user : {},
        events: [],
        tasks:[],
        plannings: [],
        contacts: [],
        messages: [],
    },
    mutations: {
        UPDATE_TOKEN(state, token) {
            state.token = token;
            state.planningApi.setToken(token)
        },
        UPDATE_ALL_PLANNING(state, plannings) {
            state.plannings = plannings;
        },
        UPDATE_ALL_EVENT(state, events) {
            state.events = events;
        },
        UPDATE_ALL_TASK(state, tasks) {
            state.tasks = tasks;
        },
        UPDATE_ALL_CONTACT(state, contacts) {
            state.contacts = contacts;
        },
        UPDATE_MESSAGE(state, message) {
            state.message = message
        }
    },
    actions: {
        updateToken({commit}, token) {
            localStorage.setItem('token', token)
            commit('UPDATE_TOKEN', token)
        },
        updateAllPlannings({commit}, plannings) {
            commit('UPDATE_ALL_PLANNING', plannings)
        },
        updateAllEvents({commit}, events) {
            commit('UPDATE_ALL_EVENT', events)
        },
        updateAllTasks({commit}, tasks) {
            commit('UPDATE_ALL_TASK', tasks)
        },
        updateAllContacts({commit}, contacts) {
            commit('UPDATE_ALL_CONTACT', contacts)
        },
        updateMessage({commit}, message) {
            commit('UPDATE_MESSAGE', message)
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        planningApi(state) {
            return state.planningApi
        },
        isConnected(state) {
            return state.token !== ''
        },
        isLogOut(state) {
            return state.token === '' || null
        },
        allPlannings(state) {
            return state.plannings
        },
        allEvents(state) {
            return state.events
        },
        allTasks(state) {
            return state.tasks
        },
        allContacts(state) {
            return state.contacts
        },
        messages(state) {
            return state.message
        },
        task: (state) => (taskId) => {
            taskId = parseInt(taskId, 10);
            let task = null;
            state.tasks.forEach((value) => {
                if (value.id === taskId) {
                    task = value;
                }
            })

            return task;
        }
    },
    modules: {

    }
})
