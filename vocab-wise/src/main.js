import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// TODO: refactor me
const pinia = createPinia()

pinia.use(({ store }) => {
  // Load state from local storage when Pinia store is instantiated
  const persistedState = localStorage.getItem('myData')
  if (persistedState) {
    store.$patch(JSON.parse(persistedState))
  }

  // Save state to local storage whenever it changes
  store.$subscribe((mutation, state) => {
    localStorage.setItem('myData', JSON.stringify(state))
  })
})

app.use(pinia)
app.use(router)

app.mount('#app')
