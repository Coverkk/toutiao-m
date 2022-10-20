<template>
  <div class="my-container">
    <!-- 已登录顶部 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image round fit="cover" class="avatar" :src="userInfo.photo" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录顶部 -->

    <!-- 未登录顶部 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="login-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 未登录顶部 -->
    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="iconfont icon-shoucang"></i>
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="iconfont icon-lishi"></i>
        </template>
        <template #text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="msg-cell">
      <van-cell title="我的消息" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <van-cell title="退出登录" class="logout-cell" clickable v-if="user" @click="onLogout" />
    <!-- 导航 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getUserInfoAPI } from '@/api'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 退出登录
    ...mapMutations(['logout']),
    onLogout () {
      // 1. 提示用户是否确认退出
      // 2. 确认退出，清空用户状态
      this.$dialog.confirm({
        title: '提示',
        message: '是否确定退出登录'
      }).then(() => {
        // 确认退出登录，调用mutation里面的logout方法
        this.logout()
      }).catch(() => {
        return null
      })
    },
    async getUserInfo () {
      try {
        const { data: { data } } = await getUserInfoAPI(this.user.token)
        // console.log(data)
        this.userInfo = data
      } catch (err) {
        this.$toast('获取用户信息失败')
        console.log('获取用户信息失败', err)
      }
    }
  },
  // 在组件初始化之后，检查用户是否有登录，登录了获取用户数据
  created () {
    if (this.user) {
      this.getUserInfo()
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 360px;
    background: url(~@/assets/banner.png);
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      .login-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 230px;
      padding: 76px 36px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 130px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }

        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }

    .data-stats {
      padding: 0 36px;
      display: flex;

      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 140px;

      i.iconfont {
        font-size: 45px;
      }

      .icon-shoucang {
        color: #eb5253;
      }

      .icon-lishi {
        color: #ff9d1d;
      }

      span.text {
        font-size: 28px;
      }
    }
  }
  .msg-cell {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
}
</style>
