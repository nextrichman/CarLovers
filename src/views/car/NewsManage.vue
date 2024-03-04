<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import NewsDrawer from './components/NewsDrawer.vue'
import { useUserStore } from '@/stores'

// 展开抽屉组件
const newsDrawerRef = ref()
const onAddArticle = () => {
  newsDrawerRef.value.open({})
}

const { findselfnews } = useUserStore()

const tableData = ref()

onMounted(async () => {
  // console.log('sssssssssss')
  // console.log(news)
  await findselfnews(useUserStore().user.username)
  // console.log(useUserStore().selfnews)
  tableData.value = useUserStore().selfnews
})

const updatedpage = async (msg) => {
  // console.log(msg)
  // console.log(news)
  tableData.value = msg
}
// const tableData = [
//   {
//     date: '2016-05-03',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles'
//   }
// ]
</script>
<template>
  <page-container title="新车资讯文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle()">添加文章</el-button>
    </template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="publishdate" label="发布日期" width="180" />
      <el-table-column prop="writedate" label="写作日期" width="180" />
      <el-table-column prop="nickname" label="用户名" width="180" />
      <el-table-column prop="title" label="文章标题" />
    </el-table>
    <news-drawer ref="newsDrawerRef" @over="updatedpage"></news-drawer>
  </page-container>
</template>

<style lang="scss" scoped></style>
