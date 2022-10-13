// vue脚手架项目 - 默认的配置文件名
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 80 // 设置端口号
    // open : true // 浏览器默认打开
  }
})
