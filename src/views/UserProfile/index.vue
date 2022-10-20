<template>
  <div class="user-profile">
    <!-- 头部导航 -->
    <van-nav-bar
    title="个人资料"
    left-arrow
    @click-left="$router.back()"
    class="page-nav-bar"
    />
    <!-- 头部导航 -->
    <!-- 个人信息 -->
    <input type="file" ref="file" hidden @change="onFileChange">
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <template #default>
        <van-image
        class="avatar"
        fit="cover"
        round
        :src="userProfile.photo"
        />
      </template>
    </van-cell>
    <van-cell title="昵称" :value="userProfile.name" is-link @click="isUpdateNameShow = true" />
    <van-cell title="性别" :value="userProfile.gender === 0 ? '男' : '女'" is-link @click="isUpdateGenderShow = true"/>
    <van-cell title="生日" :value="userProfile.birthday" is-link  @click="isUpdateBirthdayShow = true"/>
    <!-- 个人信息 -->
    <!-- 编辑头像 -->
    <van-popup
    v-model="isUpdatePhotoShow"
    position="bottom"
    :style="{ height: '100%' }"
    >
    <UpdatePhoto :img="imgSrc" @back="isUpdatePhotoShow = false" @update-success="userProfile.photo = $event.photo"></UpdatePhoto>
    </van-popup>
    <!-- 编辑头像 -->
    <!-- 编辑昵称 -->
    <van-popup
    v-model="isUpdateNameShow"
    position="bottom"
    :style="{ height: '100%' }"
    >
    <UpdateName v-if="isUpdateNameShow" @back="isUpdateNameShow = false" v-model="userProfile.name" @updateUserName="updateUserName"></UpdateName>
    </van-popup>
    <!-- 编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup
    v-model="isUpdateGenderShow"
    position="bottom"
    >
    <UpdateGender v-if="isUpdateGenderShow" @back="isUpdateGenderShow = false" @updateUserGender="updateUserGender" :gender="userProfile.gender"></UpdateGender>
    </van-popup>
    <!-- 编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup
    v-model="isUpdateBirthdayShow"
    position="bottom"
    >
    <UpdateBirthday v-if="isUpdateBirthdayShow" @back="isUpdateBirthdayShow = false" @updateUserBirthday="updateUserBirthday" :birthday="userProfile.birthday"></UpdateBirthday>
    </van-popup>
    <!-- 编辑生日 -->
  </div>
</template>

<script>
import { getUserProfileAPI } from '@/api'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo.vue'
export default {
  data () {
    return {
      userProfile: {}, // 用户个人资料
      isUpdateNameShow: false, // 控制编辑用户昵称的弹出层显示
      isUpdateGenderShow: false, // 控制编辑用户性别的弹出层显示
      isUpdateBirthdayShow: false, // 控制编辑用户生日的弹出层显示
      isUpdatePhotoShow: false,
      imgSrc: ''
    }
  },
  created () {
    // 在组件初始化完成之后，获取用户个人资料
    this.getUserProfile()
  },
  methods: {
    async getUserProfile () {
      try {
        const { data: { data } } = await getUserProfileAPI()
        // console.log(data)
        this.userProfile = data
      } catch (error) {
        console.log(error)
        this.$toast.fail('获取个人资料失败')
      }
    },
    updateUserName (newUserName) {
      // 关闭弹出层
      this.isUpdateNameShow = false
      // 修改昵称
      this.userProfile.name = newUserName
    },
    updateUserGender (newGender) {
      // 关闭弹出层
      this.isUpdateGenderShow = false
      // 修改昵称
      this.userProfile.gender = newGender
    },
    updateUserBirthday (newBirthday) {
      // 修改生日
    //   console.log(newBirthday)
      this.isUpdateBirthdayShow = false
      this.userProfile.birthday = newBirthday
    },
    onFileChange () {
      // 当检测到file类型的input标签里面文件发生改变时
      // 1. 获取文件对象
      const file = this.$refs.file.files[0]
      // 2. 基于文件对象获取 blob 数剧，相当于图片的src
      this.imgSrc = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true

      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.values = ''
    }
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
