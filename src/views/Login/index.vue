<template>
  <div class="login-container">
    <!-- 登录navbar -->
    <van-nav-bar class="page-nav-bar" title="登录" left-arrow @click-left="$router.back()" />
    <!-- 登录navbar -->

    <!-- 登录表单 -->
    <!--
      表单验证：
      1. 给 van-field 组件配置 rules 验证规则
      参考文档：
      2. 当表单提交的时候会自动触发表单验证
      如果验证通过，会触发 submit 事件
      如果验证失败，不会触发 submit
     -->
    <van-form ref="loginFrom" @submit="onSubmit">
      <van-field name="mobile"
      placeholder="请输入手机号"
      v-model="user.mobile"
      :rules="userFormRules.mobile"
      type="number"
      maxlength="11">
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field v-model="user.code"
      name="code"
      placeholder="请输入验证码"
      :rules="userFormRules.code"
      type="number"
      maxlength="6">
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down :time="1000*60"
          format="ss s"
          v-if="isCountShow"
          @finish="isCountShow = false" />
          <van-button
          v-else
          class="send-sms-btn"
          native-type="button"
          size="small"
          type="default" round
          @click="onSendSms($event)"
          ref="codeTime">发送验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 登录表单 -->
    <div class="test">测试账号 13911111111 ，万能验证码246810</div>
  </div>
</template>

<script>
// 引入接口
import { loginAPI, sendSmsAPI } from '@/api'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: { // 手机号与验证码表单校验规则
        // 多个校验规则，从上到下依次校验
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8|9]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountShow: false // 倒计时是否显示
    }
  },
  methods: {
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证

      // 在组件中必须通过 this.$toast 来调用 Toast 组件
      // 在同一时间，只能存在一个toast组件，若有新的toast组件，则会杀死上一个
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      // 3. 根据表单请求登录
      try {
        const { data } = await loginAPI(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功，跳转到我的页面
        this.$router.push('/layout/my')
      } catch (err) {
        if (err.response.status === 400) { // 手机号或验证码错误导致登录失败
          this.$toast.fail('手机号或验证码错误')
        } else { // 未知错误，可能是网络不行...
          this.$toast.fail('登录失败请稍后重试')
        }
      }
      // 4. 根据请求响应结果处理后续操作
    },
    // 发送验证码
    async onSendSms (e) {
      // 1.校验手机号
      try {
        // 通过ref获取到登录表单对象，并且调用validate方法，传入手机号输入框的name属性，单独校验
        this.$refs.loginFrom.validate('mobile')
      } catch (err) {
        return console.log('手机号格式错误', err)
      }
      // 2.重新发送倒计时
      this.isCountShow = true
      // 3.请求发送验证码
      try {
        await sendSmsAPI(this.user.mobile)
        // 验证码发送成功，轻提示
        this.$toast('发送成功')
      } catch (err) {
        // 验证码发送失败，终止计时器
        this.isCountShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('验证码发送失败')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    color: #666;
    font-size: 22px;
  }

  .login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }

  .test {
    padding: 53px;
    font-size: 30px;
    color: #666;
  }
}
</style>
