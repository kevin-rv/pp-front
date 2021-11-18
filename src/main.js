import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@popperjs/core'
import 'bootstrap'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import datetime from 'vue3-datetime-plugin/src/index'
// import Vuesax from 'vuesax'
// import  'vuesax/dist/vuesax.css'


let app = createApp(App).use(store).use(router).use(datetime)
app.config.globalProperties.$bootstrap = bootstrap;
app.config.globalProperties.$bootstrapActivatePopovers = function () {
    let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map((popoverTriggerEl) => {
        return new this.$bootstrap.Popover(popoverTriggerEl)
    })
}
app.mount('#app')
