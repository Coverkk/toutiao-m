<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/">
        <van-search
            v-model="searchText"
            show-action
            background="#3296fa"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow = false"
        />
    </form>
    <!-- 顶部搜索栏 -->

    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow"></SearchResult>
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchText.trim()"></SearchSuggestion>
    <!-- 联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory v-else></SearchHistory>
    <!-- 搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
export default {
  data () {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果展示
    }
  },
  methods: {
    onSearch (val) {
      this.isResultShow = true
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
