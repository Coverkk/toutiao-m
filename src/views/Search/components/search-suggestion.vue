<template>
  <div class="search-suggestion">
    <van-cell :title="suggestion" icon="search" v-for="(suggestion, index) in suggestions" :key="index"></van-cell>
  </div>
</template>

<script>
import { searchSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      suggestions: [] // 联想建议数据列表
      // timer: null // 联想建议防抖定时器
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
    //   handler (val) {
    //     // console.log(val)
    //     if (val.trim()) {
    //     //   console.log(val)
    //       this.searchSuggestion()
    //     }
    //   },
    // _.debounce(func, [wait=0], [options=])
    // 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。
    // debounced（防抖动）函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。
    // 可以提供一个 options（选项） 对象决定如何调用 func 方法，options.leading 与|或 options.trailing 决定延迟前后如何触发
    // （注：是 先调用后等待 还是 先等待后调用）。
    // 优化防抖
      handler: debounce(function () {
        this.searchSuggestion()
      }, 200),
      immediate: true
    }
  },
  methods: {
    // 获取联想建议
    async searchSuggestion () {
      // 如果有定时器，删除上一个定时器
      //   优化防抖
    //   if (this.timer) {
    //     clearTimeout(this.timer)
    //   }
    //   this.timer = setTimeout(async () => {
    //     try {
    //       const { data: { data: { options } } } = await searchSuggestionAPI(this.searchText)
    //       // console.log(res)
    //       // 将获取到的结果放到联想建议的数组中
    //       this.suggestions = options
    //     } catch (err) {
    //       this.$toast('获取数据失败，请稍后重试')
    //     }
    //   }, 500)
      try {
        const { data: { data: { options } } } = await searchSuggestionAPI(this.searchText)
        // console.log(res)
        // 将获取到的结果放到联想建议的数组中
        this.suggestions = options
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
