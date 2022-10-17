<template>
  <div class="search-result">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="加载失败，请点击重试"
    >
        <van-cell v-for="result in list" :key="result.art_id" :title="result.title" />
    </van-list>
  </div>
</template>

<script>
import { searchResultAPI } from '@/api'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      error: false // 搜索失败状态
    }
  },
  methods: {
    async onLoad () {
    //   获取搜索结果
      try {
        // 使用API获取搜索结果
        const { data: { data: { results } } } = await searchResultAPI({
          page: this.page, // 页码
          per_page: 10, // 每页的数据量
          q: this.searchText
        })
        // console.log(results)
        if (results) {
          //   获取到数剧，将其拼接到list中
          await this.list.push(...results)
          //   释放loading，使onLoad可以继续触发
          this.loading = false
          //   更新加载下一次的页码
          this.page += 1
        } else {
        //   没有数据了，全部加载完成，关闭onLoad触发
          this.finished = true
        }
      } catch (err) {
        // 加载失败状态提示
        this.error = true
        this.loading = false
        this.page = 1
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
