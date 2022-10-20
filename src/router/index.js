import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Video from '@/views/Video'
import Qa from '@/views/Qa'
import My from '@/views/My'
import Search from '@/views/Search'
import Article from '@/views/Article'
import UserProfile from '@/views/UserProfile'

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
  },
  {
    path: '/article/:articleId', // 动态路由，根据文章id跳转不同路由
    name: 'article',
    component: Article,
    props: true // 允许将参数作为 props 传递给由 router-view 渲染的组件。当传递给一个多视图记录时，它应该是一个与组件具有相同键的对象，或者是一个应用于每个组件的布尔值。
    // 开启 props 传参，说白了就是把路由参数映射打组件的 props 数据中
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: UserProfile
  }
]

const router = new VueRouter({
  routes
})

export default router
