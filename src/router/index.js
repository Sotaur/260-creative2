import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Graphs from '@/components/Graphs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Statistics',
      component: Dashboard
    },
    {
      path: '/Graphs',
      name: 'Graphs',
      component: Graphs
    }
  ]
})
