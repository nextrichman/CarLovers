<script setup>
// import { reactive } from 'vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { addNewsService } from '@/api/user'

// 是在使用仓库中数据的初始值 (无需响应式) 解构无问题
const {
  user: { nickname, username },
  findselfnews
} = useUserStore()

const visibleDrawer = ref(false)

// 组件对外暴露一个方法 open，基于open传来的参数，区分添加还是编辑
// open({})  => 表单无需渲染，说明是添加
// open({ id, ..., ... })  => 表单需要渲染，说明是编辑
// open调用后，可以打开抽屉
const open = async () => {
  visibleDrawer.value = true // 显示抽屉
}
defineExpose({
  open
})

// do not use same name with ref
const form = ref({
  title: '',
  writedate: '',
  publishdate: '',
  imgurl: '',
  content: '',
  nickname,
  username
})

const writeDate1 = ref()
const writeDate2 = ref()

const imgurl = ref()
const uploadRef = ref()
const onSelectFile = (uploadFile) => {
  // 基于 FileReader 读取图片做预览
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imgurl.value = reader.result
    form.value.imgurl = reader.result
    // console.log(form.imgurl)
  }
}

const emit = defineEmits(['over'])

const onSubmit = async () => {
  //将writeDate1,writeDate2的值提取合并赋值给writeDate
  const year = writeDate1.value.getFullYear()
  const month = String(writeDate1.value.getMonth() + 1).padStart(2, '0')
  const day = String(writeDate1.value.getDate()).padStart(2, '0')
  const hour = String(writeDate2.value.getHours()).padStart(2, '0')
  const minute = String(writeDate2.value.getMinutes()).padStart(2, '0')
  const second = String(writeDate2.value.getSeconds()).padStart(2, '0')
  form.value.writedate = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  console.log('submit!')
  //获取发布时间
  form.value.publishdate = new Date().toLocaleString()
  // console.log('1111111111111111111111')
  // console.log(form.title)
  // console.log('1111111111111111111111')
  // console.log(form.writedate)
  // console.log('1111111111111111111111')
  // console.log(form.imgurl)
  // console.log('1111111111111111111111')
  // console.log(form.content)
  // console.log('1111111111111111111111')
  // console.log(form.publishdate)
  // console.log('1111111111111111111111')
  // console.log(form.nickname)
  // console.log('1111111111111111111111')
  // console.log(form.username)
  console.log(form.value)

  await addNewsService(form.value)
  // 通知 user 模块，进行数据的更新
  await findselfnews(form.value.username)
  // console.log(useUserStore().selfnews)
  emit('over', useUserStore().selfnews)
  // 提示用户
  ElMessage.success('发布成功')
}
</script>

<template>
  <el-drawer v-model="visibleDrawer" title="添加文章" size="50%">
    <el-form :model="form" label-width="100px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="写作时间">
        <el-col :span="11">
          <el-date-picker
            v-model="writeDate1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="writeDate2"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="文章封面">
        <el-upload
          ref="uploadRef"
          :auto-upload="false"
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgurl" :src="imgurl" class="avatar" />
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
      </el-form-item>

      <el-form-item label="文章内容">
        <div class="editor">
          <el-input v-model="form.content" type="textarea" rows="8" cols="50" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 248px;
      height: 248px;
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
.editor {
  width: 100%;
  height: 200px;
}
</style>
