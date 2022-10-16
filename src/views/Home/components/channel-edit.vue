<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <!-- 我的频道标题 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <van-button type="danger" plain round size="small" class="my-channel-edit-btn" @click="channelEdit()">编辑</van-button>
    </van-cell>
    <!-- 我的频道宫格 -->
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item class="grid-item" icon="clear" v-for="value in 8" :key="value" text="文字" />
    </van-grid>
    <!-- 我的频道 -->

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">频道推荐</div>
      </template>
    </van-cell>
    <!-- 频道推荐宫格 -->
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item class="grid-item" icon="plus" v-for="value in 8" :key="value" text="文字" />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      isClear: false
    }
  },
  methods: {
    channelEdit () {
      this.isClear = !this.isClear
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 85px;

  .my-channel-edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .title-text {
    font-size: 32px;
    color: #333;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f5f6f7;
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
      }
    }
  }
  /deep/ .my-grid {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;

    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
