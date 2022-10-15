<template>
    <div class="article-list">
      <van-pull-refresh v-model="refreshLoading"
      @refresh="onRefresh"
      :success-text="refreshText">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        >
            <van-cell v-for="article in list" :key="article.art_id" :title="article.title" />
        </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>
import { getChannelArticlesAPI } from '@/api'
export default {
  data () {
    return {
      list: [], // 数据列表
      loading: false, // 监听是否触发触底刷新，false为触发
      finished: false, // 监听数据是否全部加载完成
      timestamp: Date.now(), // 时间戳，用来请求数据
      error: false, // 新闻列表加载状态，false为可以正常加载
      refreshLoading: false, // 下拉刷新完成状态
      refreshText: '刷新成功'
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad () { // 组件初始化完成的时候，函数也会加载
      try {
        // 1. 请求获取数据
        const { data: { data } } = await getChannelArticlesAPI({
          channel_id: this.channel.id,
          //   可以把 timestamp 理解为页码
          //   如果请求第一页数据：当前最新时间戳 Date.now
          //   如果请求之后的数据，使用本次接口返回的 pre_time
          timestamp: this.timestamp // 时间戳，请求新的推荐数据，传当前的时间
        })
        // console.log(data)
        // 模拟随机失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('dhajkdjak')
        // }
        // 2.把请求结果数据放到 list数组
        this.list.push(...data.results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成，没有数据了，吧finished设置为true，不再触发onLoad
        if (data.results.length) {
          // 还有数据可以加载，更新时间戳
          // 更新时间戳，为后面刷新获取更多数据做准备
          this.timestamp = data.pre_timestamp
        } else {
        //   数据全部加载完成，将finished设置为true，不再触发onLoad
          this.finished = true
        }
      } catch (err) {
        // 加载新闻列表失败，给错误提示
        this.error = true
        // 把加载状态设置为结束
        this.loading = false
      }
    },
    // 下拉刷新函数
    async onRefresh () {
      try {
        // 1. 调用API接口，获取最新的文章
        const { data: { data } } = await getChannelArticlesAPI({
          channel_id: this.channel.id,
          //   可以把 timestamp 理解为页码
          //   如果请求第一页数据：当前最新时间戳 Date.now
          //   如果请求之后的数据，使用本次接口返回的 pre_time
          timestamp: Date.now() // 时间戳，请求新的推荐数据，传当前的时间
        })
        // 2.把请求结果数据追加到 list数组顶部
        // this.list = data.results
        this.list.unshift(...data.results)
        // 因为下拉刷新，只加载一次，此时获取到的数据，不能铺满列表，触发不了加载更多
        // 需要手动触发加载更多数据的函数
        // await this.onLoad()
        // 更新时间戳，为后面刷新获取更多数据做准备
        // this.timestamp = data.pre_timestamp
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.refreshLoading = false
        this.refreshText = `刷新成功，刷新了${data.results.length}条数据`
      } catch (err) {
        // 加载新闻列表失败，给错误提示
        this.refreshText = '刷新失败'
        // 把加载状态设置为结束
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
