import Vue from 'vue'
import Router from 'vue-router'
import Doctors from './components/Doctors.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/doctors',
            name: 'doctors',
            component: Doctors
        },

    ]
})