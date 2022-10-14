<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar class="layout-tabbar" route >
      <van-tabbar-item to="/layout/home">
        <span>首页</span>
        <template #icon>
          <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
          <i class="iconfont icon-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/qa">
        <span>问答</span>
        <template #icon>
          <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
          <i class="iconfont icon-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item  to="/layout/video">
        <span>视频</span>
        <template #icon>
          <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
          <i class="iconfont icon-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item  to="/layout/my">
        <span>{{ $store.state.user ? '我的' : '未登录'}}</span>
        <template #icon>
          <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
          <i class="iconfont icon-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="less">
.layout-tabbar {
  .iconfont {
    font-size: 40px;
  }
  span {
    font-size: 20px;
  }
}
</style>
