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
import EditData from "@/components/EditData.vue";
import AddDoctor from "@/components/AddDoctor.vue";
import Records from "@/components/Records.vue";
import EditServices from "@/components/EditServices.vue";
import stores from "../stores"

const ifNotAuthenticated = (to, from, next) => {
    if (!stores.getters.isAuthenticated) {
        next();
        return;
    }
    next('/');
};

const ifAuthenticated = (to, from, next) => {
    if (stores.getters.isAuthenticated) {
        next();
        return;
    }
    next('/login');
};

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
        component: Login,
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration,
    },
    {
        path: '/modal',
        name: 'modal',
        component: Modal
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/profile/my-records',
        name: 'profile/my-records',
        component: MyRecords,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/profile/edit',
        name: 'profile/edit',
        component: EditData,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/admin/records',
        name: 'admin/records',
        component: Records,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/admin/services',
        name: 'admin/services',
        component: EditServices,
        beforeEnter: ifAuthenticated
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;