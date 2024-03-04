<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'
const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
// const onSelectFile = (uploadFile) => {
//   // 基于 FileReader 读取图片做预览
//   const reader = new FileReader()
//   reader.readAsDataURL(uploadFile.raw)
//   reader.onload = () => {
//     imgUrl.value = reader.result
//   }
// }
const onSelectFile = async (uploadFile) => {
  const image = new Image()
  const reader = new FileReader()

  reader.onload = (e) => {
    image.src = e.target.result
  }

  reader.readAsDataURL(uploadFile.raw)

  image.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // 设置 canvas 大小，并绘制压缩后的图片
    canvas.width = image.width * 0.5 // 压缩到原始尺寸的一半
    canvas.height = image.height * 0.5 // 压缩到原始尺寸的一半
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    // 将 canvas 中的图像转为 Data URL，可直接赋值给 img 元素的 src
    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6) // 第二个参数是压缩质量，0.6 表示 60% 质量

    // 更新图片预览和表单数据
    imgUrl.value = compressedDataUrl
  }
}

const onUpdateAvatar = async () => {
  // 发送请求更新头像
  // console.log(1111111)
  // console.log(imgUrl.value)
  await userUpdateAvatarService(imgUrl.value)
  // userStore 重新渲染
  await userStore.getUser()
  // 提示用户
  ElMessage.success('头像更新成功')
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      class="avatar-uploader"
      :show-file-list="false"
      :on-change="onSelectFile"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

    <br />

    <el-button
      @click="uploadRef.$el.querySelector('input').click()"
      type="primary"
      :icon="Plus"
      size="large"
      >选择图片</el-button
    >
    <el-button
      @click="onUpdateAvatar"
      type="success"
      :icon="Upload"
      size="large"
      >上传头像</el-button
    >
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
