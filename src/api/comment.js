import request from '@/utils/request'

// 获取文章评论列表
export const getCommentList = params => {
  return request({
    url: '/v1_0/comments',
    // GET 参数使用 params 进行传递
    // 我们写的时候是对象，但是最终发给后端的数据是？
    // axios 会把 params 对象转为 key=value&key=value 的格式放到 url 中发送
    // 因为 axios 的转化，会使某些数据出错，解决方法为，在axios转化之前，我们手动转为字符串
    // 所以应对params中的可能超出安全范围的数据，先toString()
    params
  })
}

// 对评论点赞
export const goodJob = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论的点赞
export const cancelGoodJob = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

// 对文章或者评论进行评论
export const postComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
