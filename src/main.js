

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import mitt from "mitt";
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Toast,{POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";
import i18n from "@/i18n";

//Axious
import axios from 'axios'

axios.defaults.baseURL =
    axios.defaults.baseURL = import.meta.env.VITE_API_URL



const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes

    },
    theme: {
        defaultTheme: localStorage.getItem('theme') || 'light'
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router,axios)
app.use(vuetify)
app.use(Toast,{ position: POSITION.BOTTOM_RIGHT })

app.use(i18n)
app.mount('#app')
