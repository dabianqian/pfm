import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

import signIn from '../views/signIn.vue'
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
    ]
})

export default router
