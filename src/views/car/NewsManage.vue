<script setup>
import { ref } from 'vue'
import NewsDrawer from './components/NewsDrawer.vue'

// 展开抽屉组件
const newsDrawerRef = ref()
const onAddArticle = () => {
  newsDrawerRef.value.open({})
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
<template>
  <page-container title="新车资讯文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle()">添加文章</el-button>
    </template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="发布日期" width="180" />
      <el-table-column prop="date" label="写作日期" width="180" />
      <el-table-column prop="name" label="用户名" width="180" />
      <el-table-column prop="address" label="文章标题" />
    </el-table>
    <news-drawer ref="newsDrawerRef"></news-drawer>
  </page-container>
</template>

<style lang="scss" scoped></style>
