import { createStore } from 'vuex'

import planningApi from "../api/planningApi";

export default createStore({
    state: {
        planningApi: planningApi.setToken(localStorage.getItem('token')),
        token: localStorage.getItem('token'),
        user : {},
        plannings: {},
        contacts: {},
    },
    mutations: {
        UPDATE_TOKEN(state, token) {
            state.token = token;
        }
    },
    actions: {
        updateToken({commit}, token) {
            localStorage.setItem('token', token)
            commit('UPDATE_TOKEN', {token})
        }
    },
    getters: {
        token(state) {
            return state.token
        },
    },
    modules: {

    }
})
