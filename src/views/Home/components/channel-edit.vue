<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <!-- 我的频道标题 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <van-button type="danger" plain round size="small" class="my-channel-edit-btn" @click="channelEdit()">{{ isClear ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <!-- 我的频道宫格 -->
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item class="grid-item"  v-for="(channel , index) in myChannels" :key="channel.id"  >
        <template #text>
          <span class="text" :class="{ active: active === index}">{{channel.name}}</span>
        </template>
        <template #icon >
          <i class="van-icon van-icon-clear van-grid-item__icon" v-if="isClear && index != 0"></i>
        </template>
      </van-grid-item>
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
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
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
    .van-grid-item__content{
      white-space: nowrap;
      background-color: #f5f6f7;
      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
  }
  /deep/ .my-grid {
    .van-grid-item__icon-wrapper {
      position: absolute;
      right: -10px;
      top: -30px;
      z-index: 2;
      .van-icon-clear {
        font-size: 30px;
        color: #cacaca;
      }
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
      }
    }
  }
}
</style>
