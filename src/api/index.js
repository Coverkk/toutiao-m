import { login, sendSms, getUserInfo, getUserChannels } from './user'
import { getChannelArticles } from './articles'
import { getAllChannel, addUserChannel, delUserChannel } from './channel'
import { searchSuggestion } from './search'

// user.js
// 用户登录接口
export const loginAPI = login
// 请求发送验证码
export const sendSmsAPI = sendSms
// 获取用户自己的信息
export const getUserInfoAPI = getUserInfo
// 获取用户频道
export const getUserChannelsAPI = getUserChannels

// articles.js
// 获取频道推荐新闻列表
export const getChannelArticlesAPI = getChannelArticles

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
