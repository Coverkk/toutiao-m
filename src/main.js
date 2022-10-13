import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less' // 全局导入样式
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible' // 加载动态设置 rem 基准值

Vue.use(Vant) // 全局导入vant全部组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
