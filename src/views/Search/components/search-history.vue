<template>
  <div class="search-history">
    <van-cell title="搜索历史">
        <van-icon name="delete" v-if="!isDel" @click="isDel = true"></van-icon>
        <div v-else>
            <span @click="delAllHistory">全部删除</span>
            &nbsp;&nbsp;
            <span @click="isDel = false">完成</span>
        </div>
    </van-cell>
    <van-cell :title="val" v-for="(val, index) in searchHistorys" :key="index" @click="onHistoryClick(val)">
      <van-icon name="close" v-if="isDel"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDel: false,
      searchHistory: this.searchHistorys // 搜索历史记录
    }
  },
  props: {
    // props数据
    // 如果是引用类型数据（数组，对象）
    //     可以修改，例如 [].push(xxx) , 对象.xxx = xxx
    //     不能重新赋值， xxx = []
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  methods: {
    onHistoryClick (val) {
      //   当处于删除状态的时候，点击删除该历史记录
      if (this.isDel) {
        // 找到要删除数据的下标
        const index = this.searchHistory.indexOf(val)
        // 删除该记录
        this.searchHistory.splice(index, 1)
      } else {
        // 处于非删除状态，点击直接触发父组件的搜索事件
        this.$emit('search', val)
      }
    },
    delAllHistory () {
      //   删除全部历史记录
    //   告诉父组件，清空历史记录
      this.$emit('clearHistory')
    //   this.searchHistory.splice(0, this.searchHistory.length)
    //   this.searchHistory = []
    }
  }
}
</script>

<style scoped lang="less">

</style>
