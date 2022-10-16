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
      <van-grid-item @click="addMychannel" class="grid-item" icon="plus" v-for="channel in recommendChannels" :key="channel.id" :text="channel.name" />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api'
export default {
  data () {
    return {
      isClear: false, // 编辑组件的状态
      allChannels: []
    }
  },
  computed: {
    recommendChannels () {
      const allChannels = this.allChannels
      // 将用户以添加的频道，从所有频道列表删除
      // 遍历我的频道列表
      this.myChannels.forEach(channel => {
        // 找出和我的频道列表的数据同名的所有频道的索引
        const index = allChannels.findIndex(obj => obj.id === channel.id)
        // 将已在我的频道列表存在的数据，从所有频道里删除
        allChannels.splice(index, 1)
      })
      // console.log(this.allChannels)
      return allChannels
    }
  },
  methods: {
    channelEdit () {
      this.isClear = !this.isClear
    },
    addMychannel () {
      // 添加频道
    },
    async getAllChannels () {
      // 获取所有频道列表
      try {
        const { data: { data: { channels } } } = await getAllChannelAPI()
        // const data = await getAllChannelAPI()
        // console.log(data)
        // const channels = data.data.data.channels
        // console.log(channels)
        // 将获取到的数据，放到allChannels数组
        this.allChannels = channels
      } catch (err) {
        console.log('请求所有频道列表失败', err)
      }
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
  },
  created () {
    // 在组件初始化完成之后，获取所有频道列表
    this.getAllChannels()
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
