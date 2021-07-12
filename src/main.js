import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@popperjs/core'
import 'bootstrap'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

let app = createApp(App).use(store).use(router)
app.config.globalProperties.$bootstrap = bootstrap;
app.config.globalProperties.$bootstrapActivatePopovers = function () {
    let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map((popoverTriggerEl) => {
        return new this.$bootstrap.Popover(popoverTriggerEl)
    })
}
app.mount('#app')
