import { login, sendSms, getUserInfo, getUserChannels, followUser, cancelFollowUser } from './user'
import { getChannelArticles, getArticleDetail, collectArticle, cancelCollectArticle, likeArticle, cancelLike } from './articles'
import { getAllChannel, addUserChannel, delUserChannel } from './channel'
import { searchSuggestion, searchResult } from './search'
import { getCommentList, goodJob, cancelGoodJob } from './comment'

// user.js
// 用户登录接口
export const loginAPI = login
// 请求发送验证码
export const sendSmsAPI = sendSms
// 获取用户自己的信息
export const getUserInfoAPI = getUserInfo
// 获取用户频道
export const getUserChannelsAPI = getUserChannels
// 关注用户
export const followUserAPI = followUser
// 取消关注
export const cancelFollowUserAPI = cancelFollowUser

// articles.js
// 获取频道推荐新闻列表
export const getChannelArticlesAPI = getChannelArticles
// 获取新闻文章详情
export const getArticleDetailAPI = getArticleDetail
// 收藏文章
export const collectArticleAPI = collectArticle
// 取消收藏文章
export const cancelCollectArticleAPI = cancelCollectArticle
// 对文章点赞
export const likeArticleAPI = likeArticle
// 取消点赞
export const cancelLikeAPI = cancelLike

// channel.js
// 获取所有频道列表
export const getAllChannelAPI = getAllChannel
// 添加用户频道
export const addUserChannelAPI = addUserChannel
// 删除指定用户频道
export const delUserChannelAPI = delUserChannel

// search.js
// 联想建议
export const searchSuggestionAPI = searchSuggestion
// 搜索结果
export const searchResultAPI = searchResult

// comment.js
// 获取评论列表
export const getCommentListAPI = getCommentList
// 对评论点赞
export const goodJobAPI = goodJob
// 取消对评论点赞
export const cancelGoodJobAPI = cancelGoodJob
