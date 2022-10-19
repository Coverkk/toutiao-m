import request from '@/utils/request'

// 获取文章评论列表
export const getCommentList = params => {
  return request({
    url: '/v1_0/comments',
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
