<template>
  <van-button
    v-if="is_followed"
    :loading="loading"
    class="follow-btn"
    round
    size="small"
    @click="onFollow()"
  >已关注</van-button>
  <van-button
    :loading="loading"
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow()"
  >关注</van-button>
</template>

<script>
import { followUserAPI, cancelFollowUserAPI } from '@/api'
export default {
  model: {
    // 如果需要修改 v-model 的规则名称，可以通过修改子组件的 model 属性来配置修改
    prop: 'is_followed', // 默认是value
    event: 'onFollow' // 默认是input
  },
  data () {
    return {
      loading: false
    }
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    aut_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onFollow () {
      // 开启 loading 的加载状态
      this.loading = true
      try {
        // 检查是否已关注用户
        if (this.is_followed) {
          // 已关注用户，点击取消关注
          await cancelFollowUserAPI(this.aut_id)
          // 更新关注状态
          // this.articleDetails.is_followed = false
          // this.$emit('input', false)
          // console.log('取消关注成功')
        } else {
          // 未关注用户，点击关注用户
          await followUserAPI(this.aut_id)
          // console.log('关注成功')
          // 更新关注状态
          //   this.articleDetails.is_followed = true
          // this.$emit('input', true)
        }
        this.$emit('onFollow', !this.is_followed)
      } catch (error) {
        let message = '操作失败，请稍后重试'
        if (error.response && error.response.status === 400) {
          message = error.response.data.message
        }
        this.$toast(message)
      }
      //   关闭 loading的加载状态
      this.loading = false
    }
  }
}
</script>

<style>

</style>
