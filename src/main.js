// Truy cập các biến css javacript 
import "./assets/css/bootstrap.min.css"
import "./assets/css/style.css";
import "./assets/lib/lightbox/css/lightbox.min.css";
import "./assets/lib/owlcarousel/assets/owl.carousel.css";
import "./assets/css/bootstrap.min.css"
// javacript 





import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const app = createApp(App).use(router)
app.use(VueAxios, {$request:axios})
app.use(VueSweetalert2);
app.mount('#app')
