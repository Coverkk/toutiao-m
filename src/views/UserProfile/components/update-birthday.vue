<template>
  <van-datetime-picker
  v-model="currentDate"
  type="date"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel="$emit('back')"
  @confirm="updateBirthday"
  />
</template>

<script>
import dayjs from 'dayjs'
import { editUserProfileAPI } from '@/api'
export default {
  data () {
    return {
      minDate: new Date(1900, 0, 1), // 可选最早日期
      maxDate: new Date(), // 可选最大日期
      currentDate: new Date(this.birthday) // 双向绑定，绑定选择器的默认时间，已经当前选择的时间
    }
  },
  props: {
    birthday: {
      type: String,
      required: true
    }
  },
  methods: {
    async updateBirthday (newBirthday) {
      // 修改用户生日
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const birthday = dayjs(newBirthday).format('YYYY-MM-DD')
        await editUserProfileAPI({
          birthday
        })
        this.$toast.success({
          message: '修改成功',
          duration: 500
        })
        this.$emit('updateUserBirthday', birthday)
      } catch (error) {
        this.$toast.fail('修改昵称失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-picker__cancel, /deep/ .van-picker__confirm {
    color: #1989fa;
  }
</style>
