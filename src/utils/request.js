// 请求模块
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
// JSONBig 可以处理数据中超出 JavaScript 安全整数范围的问题
// JSONBig.parse() 把 JSON 格式的字符串转为 JavaScript 对象
// 用的时候需要把 BigNumber 类型的数据转为字符串来使用
// JSONBig.stringify() 把 JavaScript 对象转为 JSON 格式的字符串

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net', // 接口的基准地址

  // 自定义后端返回的原始数据
  // data：后端返回的元素数据，说白了就是 json 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]

  // axios会默认在内部这样来处理后端返回的数据
  // return JSON.parse(data)
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器

export default request
