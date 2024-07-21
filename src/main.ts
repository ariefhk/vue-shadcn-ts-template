import './styles/tailwind.css'

import autoLoadRoute from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const initApp = async () => {
  const app = createApp(App)
  const router = await autoLoadRoute()
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
}

initApp()
