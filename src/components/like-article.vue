<template>
  <van-icon
    color="#777"
    :name="like === -1 ? 'good-job-o' : 'good-job'"
    @click="onGood"
    :class="{like: like === 1}"
  />
</template>

<script>
import { cancelLikeAPI, likeArticleAPI } from '@/api'
export default {
  model: {
    prop: 'like',
    event: 'like'
  },
  props: {
    like: {
      type: [Number, Boolean],
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onGood () {
      try {
        if (this.like === -1) {
        //   文章未点赞，点击点赞
          await likeArticleAPI(this.artId)
          await this.$emit('like', 1)
        //   console.log('点赞成功')
        } else if (this.like === 1) {
        //   文章已点赞，点击取消点赞
          await cancelLikeAPI(this.artId)
          await this.$emit('like', -1)
        }
        // 根据点赞状态，给出提示
        this.$toast.success({
          message: this.like === 1 ? '点赞成功' : '点赞取消',
          duration: 500
        })
      } catch (error) {
        // console.log('点赞失败', error)
        this.$toast.fail('操作失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-bottom {
  .like {
    color: #e5645f !important;
  }
}
</style>
