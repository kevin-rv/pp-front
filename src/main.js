import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@popperjs/core'
import 'bootstrap'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

import datetime from 'vue3-datetime-plugin/src/index'


let app = createApp(App).use(store).use(router).use(datetime)
app.config.globalProperties.$bootstrap = bootstrap;
// app.config.globalProperties.$bootstrapActivateDropdown = function () { // TODO voir si besoin pour dropdown
//     let dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'))
//     dropdownTriggerList.map((dropdownTriggerEl) => {
//         return new this.$bootstrap.Dropdown(dropdownTriggerEl)
//     })
// }
app.config.globalProperties.$bootstrapActivatePopovers = function () {
    let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map((popoverTriggerEl) => {
        return new this.$bootstrap.Popover(popoverTriggerEl)
    })
}
app.mount('#app')
