<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" >
      <van-button slot="title"
      type="info"
      size="small"
      round
      icon="search"
      class="search-btn">
        搜索
      </van-button>
    </van-nav-bar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.home-container {
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
}
</style>
