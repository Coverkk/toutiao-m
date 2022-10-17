<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/">
        <van-search
            v-model="value"
            show-action
            background="#3296fa"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
    </form>
    <!-- 顶部搜索栏 -->

    <!-- 搜索历史记录 -->
    <SearchHistory></SearchHistory>
    <!-- 搜索历史记录 -->

    <!-- 联想建议 -->
    <SearchSuggestion></SearchSuggestion>
    <!-- 联想建议 -->

    <!-- 搜索结果 -->
    <SearchResult></SearchResult>
    <!-- 搜索结果 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
    },
    onCancel () {
      this.$router.back()
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  }
}
</script>

<style scoped lang="less">
.search-container {
    .van-search__action {
        color: #fff;
    }
}
</style>
