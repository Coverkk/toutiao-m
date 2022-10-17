import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Video from '@/views/Video'
import Qa from '@/views/Qa'
import My from '@/views/My'
import Search from '@/views/Search'

Vue.use(VueRouter)

// 路由表，路由规则
const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/layout',
    // path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        // path: '', // 默认子路由，只能有一个
        name: 'home',
        component: Home
      },
      {
        path: 'video',
        name: 'video',
        component: Video
      },
      {
        path: 'my',
        name: 'my',
        component: My
      },
      {
        path: 'qa',
        name: 'qa',
        component: Qa
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
