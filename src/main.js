import { createApp } from 'vue'
import App from '~/App.vue'
import router from '~/routes'
import './routes/guards'
import store from '~/store'
import dayjs from 'dayjs'

const app = createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.$dayjs = dayjs
app.mount('#app')
