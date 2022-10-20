<template>
  <div class="update-photo">
    <img :src="img" class="img" ref="img"/>

    <div class="toolbar">
      <div class="cancel" @click="$emit('back')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updatePhotoAPI } from '@/api'
export default {
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 查看模式 裁剪区不能超出画布范围
      dragMode: 'move', // 拖动模式 move 画布可以拖动，裁剪区不能拖动
      aspectRatio: 1, // 裁剪区比例
      autoCropArea: 1, // 自动裁剪比例
      cropBoxMovable: false, // 画布可以拖动，裁剪区不能拖动
      cropBoxResizable: false, // 裁剪区不能缩放
      background: false, // 没有背景
      movable: true // 画布是否可以移动
    })
  },
  methods: {
    onConfirm () {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // 修改头像
        // console.log(blob)
        this.updatePhoto(blob)
      })
    },
    async updatePhoto (blob) {
      // 修改头像
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        // 如果接口要求 Content-Type 是 multipart/form-data
        // 则必须传递 FormData 对象
        // 如果接口要求 Content-Type 是 application/json
        // 则传递普通 JavaScript 对象
        const formData = new FormData()
        formData.append('photo', blob)
        const { data: { data } } = await updatePhotoAPI(formData)
        // 上传完成，关闭弹出层
        this.$emit('back')
        // 更新头像
        this.$emit('update-success', data)
        this.$toast.success({
          message: '修改成功',
          duration: 500
        })
      } catch (error) {
        this.$toast.fail('修改昵称失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-photo {
    height: 100%;
    background-color: #000000;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel, .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
    display: block;
    max-width: 100%;
  }
</style>
