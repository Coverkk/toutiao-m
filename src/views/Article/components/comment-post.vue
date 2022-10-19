<template>
    <div class="comment-post">
        <van-field class="post-field" v-model.trim="content" rows="2" autosize type="textarea" maxlength="50"
            placeholder="请输入留言" show-word-limit />
        <van-button class="post-btn" @click="postComment" :disabled="!content.length">发布</van-button>
    </div>
</template>

<script>
import { postCommentAPI } from '@/api'
export default {
  data () {
    return {
      content: ''
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    isPostArticleComment: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async postComment () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      try {
        const { data: { data: { new_obj: newComment } } } = await postCommentAPI({
          target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.content, // 评论内容
          art_id: this.isPostArticleComment ? null : this.target // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        this.$toast.success({
          message: '发布评论成功',
          duration: 500
        })
        this.content = ''
        this.$emit('postSuccess', newComment)
      } catch (error) {
        console.log(error)
        this.$toast.fail({
          message: '发布评论失败，请稍后重试',
          duration: 500
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;

    .post-field {
        background-color: #f5f7f9;
    }

    .post-btn {
        width: 150px;
        border: none;
        padding: 0;
        color: #6ba3d8;

        &::before {
            display: none;
        }
    }
}
</style>
