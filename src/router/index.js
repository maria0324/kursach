import { createRouter, createWebHistory } from 'vue-router'
import Doctors from "@/components/Doctors.vue";

const routes = [
    {
        path: '/doctors',
        name: 'doctors',
        component: Doctors
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})