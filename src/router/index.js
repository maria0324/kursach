import { createRouter, createWebHistory } from 'vue-router'
import Doctors from "@/components/Doctors.vue";
import Home from "@/components/Home.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
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

export default router