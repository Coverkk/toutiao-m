<template>
  <div class="search-suggestion">
    <van-cell :title="suggestion" icon="search" v-for="(suggestion, index) in suggestions" :key="index"></van-cell>
  </div>
</template>

<script>
import { searchSuggestionAPI } from '@/api'
export default {
  data () {
    return {
      suggestions: [], // 联想建议数据列表
      timer: null // 联想建议防抖定时器
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 侦听输入框输入内容searchText的变化，当searchText变化时，调用API接口，获取联想建议
    searchText: {
      handler (val) {
        // console.log(val)
        if (val.trim()) {
        //   console.log(val)
          this.searchSuggestion()
        }
      },
      immediate: true
    }
  },
  methods: {
    // 获取联想建议
    async searchSuggestion () {
      // 如果有定时器，删除上一个定时器
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        try {
          const { data: { data: { options } } } = await searchSuggestionAPI(this.searchText)
          // console.log(res)
          // 将获取到的结果放到联想建议的数组中
          this.suggestions = options
        } catch (err) {
          this.$toast('获取数据失败，请稍后重试')
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">

</style>
