<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    :class="{collected: value}"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { collectArticleAPI, cancelCollectArticleAPI } from '@/api'
export default {
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect () {
      // 开启加载状态
      this.loading = true
      await this.$emit('input', !this.value)
      try {
        if (this.value) {
        // 修改了value的值之后，value为true，应该收藏文章
        // 收藏文章
          await collectArticleAPI(this.artId)
          // console.log('收藏成功')
        } else {
          // 修改了value的值之后，value为false，应该取消收藏文章
          await cancelCollectArticleAPI(this.artId)
        // console.log('取消收藏')
        }
        this.$toast.success({
          message: this.value ? '收藏成功' : '取消收藏',
          duration: 500
        })
      } catch (error) {
        this.$toast('操作失败，请稍后重试')
      }
      // 关闭加载状态
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.article-bottom {
  .collected {
    color: #ffa500 !important;
  }
}
</style>
