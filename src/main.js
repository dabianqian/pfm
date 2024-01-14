import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";
import MainIndex from "@/MainIndex.vue";
import store from "@/store/store"
import ClassDetail from "@/components/class/ClassDetail.vue";
import CourseList from "@/components/layout/main/CourseList.vue";
import TeacherWork from "@/components/work/TeacherWork.vue";
Vue.component('ClassDetail',ClassDetail)
Vue.component('CourseList',CourseList)
Vue.component('TeacherWork',TeacherWork)
Vue.use(ElementUI);

new Vue({
  store,
  el: '#app',
  render: h => h(MainIndex),
  router:router
});
