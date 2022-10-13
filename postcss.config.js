/*
*PostCss 配置文件
*/
module.exports = {
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // VueCli 内部已经配置了 autoprefixer 插件
    // 又配置了一次，所以警告
    // autoprefixer: { autoprefixer插件配置
    // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      // lib-flexible 的 rem 视频方案：把一份分为10份，每份就是十分之一
    //   所以 rootValue 应该设置为你的设计稿宽度的十分之一
    // 我们的设计稿是 750 ，所以应该设置为 750/10 = 75
    // 但是vant 建议设置为 37.5 ，为什么？因为 vant是基于 375 设计
    // 有没有更好的办法？
    // 如果是 Vant 的样式，就按照 37.5 来转换
    // 如果是 我们自己的样式，就按照75来转换
    // 查阅文档，发现 rootValue 支持两种类型：
    // 数字：固定的数值
    // 函数：可以动态处理返回
    // pxtorem 处理每个 CSS 文件的时候都会来调用该方法
    // 它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },

      //   配置要转换的 CSS 属性
      // *表示所有
      propList: ['*']
    }
  }
}
