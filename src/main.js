// main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store' // Đảm bảo import đúng đường dẫn
import router from './router'

createApp(App)
  .use(store) // Đảm bảo sử dụng store
  .use(router)
  .mount('#app')

  store.dispatch('cart/initializeCart')
