import request from '@/utils/request'

// 获取频道新闻列表推荐
export const getChannelArticles = params => {
  return request({
    url: '/v1_0/articles',
    params
  })
}

// 获取新闻文章详情
export const getArticleDetail = articleId => {
  return request({
    url: `/v1_0/articles/${articleId}` // 字符串拼接，对象自动转为字符串
  })
}
