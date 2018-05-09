import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/Home.vue'
import Login1 from '@/containers/Login1.vue'
import Login2 from '@/containers/Login2.vue'
import Person from '@/containers/Person.vue'
import Rules from '@/containers/Rules.vue'
import Search from '@/containers/Search.vue'
import SignUp from '@/containers/SignUp.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {

      path:"/home",
      name:Home,
      component:Home
    },
    {
      path:'/login1',
      name:'Login1',
      component:Login1
    },
    {
      path:'/Login2',
      name:'Login2',
      component:Login2
    },
    {
      path:'/Person',
      name:'Person',
      component:Person
    },
    {
      path:'/rules',
      name:'Rules',
      component:Rules
    },
    {
      path:'/search',
      name:'Search',
      component:Search
    },
    {
      path:'/SignUp',
      name:'SignUp',
      component:SignUp
    }
  ]
})
