import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@popperjs/core'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'vue-flash-message/dist/vue-flash-message.min.css'

createApp(App).use(store).use(router).mount('#app')
