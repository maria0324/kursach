import { createRouter, createWebHistory } from 'vue-router'
import Doctors from "@/components/Doctors.vue";
import Home from "@/components/Home.vue";
import Services from "@/components/Services.vue";
import About from "@/components/About.vue";
import Contacts from "@/components/Contacts.vue";
import Login from "@/components/Login.vue";
import Registration from "@/components/Registration.vue";
import Modal from "@/components/Modal.vue";
import Profile from "@/components/Profile.vue";
import MyRecords from "@/components/MyRecords.vue";
import Admin from "@/components/Admin.vue";


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
    },
    {
        path: '/services',
        name: 'services',
        component: Services
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    },
    {
        path: '/modal',
        name: 'modal',
        component: Modal
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/profile/my-records',
        name: 'profile/my-records',
        component: MyRecords

    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin

    }

]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router