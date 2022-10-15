import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// dayjs默认是英文，我们这里配置为中文
dayjs.locale('zh-cn') // 配置为全局使用

// dayjs()获取当前最新事件
// dayjs().format('YYYY-MM-DD')
// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
