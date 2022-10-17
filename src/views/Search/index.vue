<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/" class="search-form">
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
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion :searchText="searchText" v-else-if="searchText.trim()" @searchFn="onSearch"></SearchSuggestion>
    <!-- 联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory v-else :searchHistorys="searchHistorys" @search="onSearch" @clearHistory="searchHistorys = []"></SearchHistory>
    <!-- 搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果展示
      searchHistorys: getItem('toutiao_search_historys') || []
    }
  },
  methods: {
    onSearch (text) {
      //   更新文本框内容
      this.searchText = text
      //   存储搜索历史记录
      //   要求：不要用重复数据，最新的搜索记录放在最前面
      //   检查这个搜索记录是否已经在历史记录中，在的话返回对应索引，否则返回-1
      const index = this.searchHistorys.indexOf(text)
      if (index !== -1) {
        // 该记录已经存在历史记录，将其移除
        this.searchHistorys.splice(index, 1)
      }
      //   将最新的记录放在最前面
      this.searchHistorys.unshift(text)
      //   渲染搜索结果
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
  },
  watch: {
    // 通过侦听器，侦听历史记录的变化，当其变化时，覆盖更新
    searchHistorys (val) {
      setItem('toutiao_search_historys', val)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
    padding-top: 108px;
    .van-search__action {
        color: #fff;
    }
    .search-form {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }
}
</style>
