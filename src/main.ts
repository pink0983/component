import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import './styles/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

createApp(App).mount('#app')
