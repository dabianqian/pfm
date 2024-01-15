import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

import signIn from '../views/signIn.vue'
import signUp from '../views/signUp.vue'

const router = new VueRouter({
    routes: [
        {
            path:'/',
            redirect:'/signIn'
        }
        ,
        {
            path:'/signIn',
            component: signIn
        }
        ,
        {
            path: '/signUp',
            component: signUp
        }
    ]
})

export default router
