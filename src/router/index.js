import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import OrdersView from '../views/OrdersView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login 
    },
    {
      path: '/home',
      component: Home,
      children: [{
          path: 'active',
          component: OrdersView
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})