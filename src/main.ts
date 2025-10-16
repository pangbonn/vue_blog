import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// import { registerSW } from 'virtual:pwa-register'

// const updateSW = registerSW({
//   onNeedRefresh() {
//     // แสดงการแจ้งเตือนให้ผู้ใช้ทราบว่ามีการอัปเดต
//     if (confirm('มีเวอร์ชันใหม่ของแอป คุณต้องการรีเฟรชเพื่ออัปเดตหรือไม่?')) {
//       updateSW(true)
//     }
//   },
//   onOfflineReady() {
//     console.log('แอปพร้อมใช้งานแบบออฟไลน์')
//   },
// })

createApp(App).use(router).mount('#app')
