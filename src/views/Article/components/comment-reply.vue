<template>
  <div class="comment-reply">
    <!-- 评论回复头部 -->
    <van-nav-bar
      :title="currentComment.reply_count > 0 ? `${currentComment.reply_count}条回复` : '暂无回复'"
    >
    <template #left>
      <van-icon name="cross" @click="$emit('close')"/>
    </template>
    </van-nav-bar>
    <!-- 评论回复头部 -->

    <div class="scroll-wrap">
      <!-- 当前评论 -->
      <CommentItem :comment="currentComment"></CommentItem>
      <!-- 当前评论 -->
      <!-- 评论回复列表 -->
      <van-cell title="全部回复"></van-cell>
      <CommentList :artId="currentComment.com_id" type="c" @onload-success="getReplyList" :list="replyList" @commentLiking="replyLiking"></CommentList>
      <!-- 评论回复列表 -->
    </div>

    <!-- 底部回复评论按钮 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="samll" round="" @click="isReplyShow = true">写评论</van-button>
    </div>
    <!-- 底部回复评论按钮 -->

    <!-- 回复评论弹出层 -->
    <van-popup
    v-model="isReplyShow"
    position="bottom"
    >
    <CommentPost :target="currentComment.com_id" :isPostArticleComment="false" @postSuccess="onPostSuccess"></CommentPost>
    </van-popup>
    <!-- 回复评论弹出层 -->
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  data () {
    return {
      replyList: [], // 评论回复列表
      isReplyShow: false // 控制回复评论的弹出层显示
    }
  },
  props: {
    currentComment: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  created () {
    // console.log(this.currentComment)
  },
  methods: {
    getReplyList (data) {
      // 获取到评论回复列表
      this.replyList = data.results
    },
    replyLiking (isLiking, index) {
      // 更新回复评论的点赞
      this.replyList[index].is_liking = isLiking
      if (isLiking) {
        // 点赞，点赞数+1
        this.replyList[index].like_count += 1
      } else {
        // 取消点赞，点赞数 -1
        this.replyList[index].like_count -= 1
      }
    },
    onPostSuccess (newReply) {
      // 回复成功，将新评论的回复放到回复列表的最前面
      this.replyList.unshift(newReply)
      // 总回复数+1
      this.$emit('replySuccess', this.currentComment.com_id)
      // 关闭弹出层
      this.isReplyShow = false
    }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 230px;
  left: 0;
  right: 0;
  bottom: 90px;
//   padding-bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
    height: 70%;
  }
}
</style>
