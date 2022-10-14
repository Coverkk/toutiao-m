<template>
  <div class="home-container">
    <!-- navbar导航 - 搜索 -->
    <van-nav-bar class="page-nav-bar">
      <van-button slot="title" type="info" size="small" round icon="search" class="search-btn">
        搜索
      </van-button>
    </van-nav-bar>
    <!-- navbar导航 - 搜索 -->

    <!-- 频道列表 -->
    <!--
      通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。
      通过 animated 属性可以开启切换标签内容时的转场动画。
      通过 swipeable 属性可以开启滑动切换标签页。
     -->
    <van-tabs class="channel-tab" v-model="active" animated swipeable>
      <van-tab :title="obj.name"
      v-for="obj in channels"
      :key="obj.id">
        <ArticleList :channel="obj"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 -->
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api'
import ArticleList from './components/article-list.vue'
export default {
  data () {
    return {
      active: 0,
      channels: [] // 用户频道列表
    }
  },
  // 组件初始化之后，获取用户频道列表
  created () {
    this.getUserChannels()
  },
  methods: {
    // 获取用户频道列表
    async getUserChannels () {
      try {
        const { data: { data: { channels } } } = await getUserChannelsAPI();
        // console.log(res)
        this.channels = channels // 保存用户频道列表
      } catch (err) {
        this.$toast('获取用户频道失败')
      }
    }
  },
  components: { ArticleList }
}
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  .search-btn {
    width: 400px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;

    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tab {
    .van-tabs__wrap {
      height: 82px;

      .van-tab--active {
        color: #333;
      }

      .van-tab {
        min-width: 200px;
        border-right: 1px solid #edeff3;
        font-size: 30px;
        color: #777;
      }

      .van-tabs__nav {
        padding-bottom: 0;
      }

      .van-tabs__line {
        bottom: 8px;
        width: 31px;
        height: 6px;
        background-color: #3296fa;
      }
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;

      .iconfont {
        font-size: 33px;
      }

      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
