<template>
  <div class="update-gender">
    <van-picker
    title="设置性别"
    show-toolbar
    :columns="columns"
    @confirm="updateGender"
    @cancel="onCancel"
    :defaultIndex="gender"
    />
  </div>
</template>

<script>
import { editUserProfileAPI } from '@/api'
export default {
  data () {
    return {
      columns: ['男', '女']
    }
  },
  props: {
    gender: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async updateGender (value, gender) {
      // 修改用户性别
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        await editUserProfileAPI({
          gender: gender
        })
        this.$toast.success({
          message: '修改成功',
          duration: 500
        })
        this.$emit('updateUserGender', gender)
      } catch (error) {
        this.$toast.fail('修改昵称失败')
      }
    },
    onCancel () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped lang="less">
.update-gender {
  /deep/ .van-picker__cancel, /deep/ .van-picker__confirm {
    color: #1989fa;
  }
}
</style>
