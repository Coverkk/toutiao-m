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

// 收藏文章
export const collectArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const cancelCollectArticle = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

// 对文章点赞
export const likeArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞
export const cancelLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
