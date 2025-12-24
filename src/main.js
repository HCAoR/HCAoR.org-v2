import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'highlight.js/styles/atom-one-dark.css' // 引入高亮样式
import '@phosphor-icons/web/bold'
import '@phosphor-icons/web/fill'
import '@phosphor-icons/web/regular'

createApp(App).use(router).mount('#app')
