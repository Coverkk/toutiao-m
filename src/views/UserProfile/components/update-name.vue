<template>
  <div class="update-name">
    <!-- 顶部nav-bar -->
    <van-nav-bar
    title="设置昵称"
    left-text="取消"
    @click-left="$emit('back')"
    @click-right="editUserProfile"
    >
      <template #right>
        <van-button type="default" :disabled="!localName" @click="editUserProfile">完成</van-button>
        <!-- <span type="button" class="complete-btn" :disabled="true" >完成</span> -->
        <!-- <button>完成</button> -->
      </template>
    </van-nav-bar>
    <!-- 顶部nav-bar -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
      v-model.trim="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
      />
    </div>
    <!-- 输入框 -->
  </div>
</template>

<script>
import { editUserProfileAPI } from '@/api'
export default {
  data () {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async editUserProfile () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      //   修改用户昵称
      try {
        await editUserProfileAPI({
          name: this.localName
        })
        this.$emit('updateUserName', this.localName)
        this.$toast.success({
          message: '修改成功',
          duration: 500
        })
        // console.log(res)
      } catch (error) {
        this.$toast.fail('修改昵称失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-name {
  /deep/ .van-nav-bar__right {
    padding: unset;
    .van-button--default {
      border: unset;
      color: #1989fa;
    }
    .van-button::before {
      width: unset;
      height: unset;
    }
  }
  .field-wrap {
    padding: 20px;
  }
}
</style>
