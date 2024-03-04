<script>
import { useUserStore } from '@/stores'
export default {
  data() {
    return {
      newsList: []
    }
  },
  mounted() {
    useUserStore().findnews()
    this.newsList = useUserStore().news
  },
  methods: {
    formatDate(dateTimeString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateTimeString).toLocaleDateString('en-US', options)
    },
    handleClick(id) {
      // 执行页面跳转并携带数据
      // console.log('sssssssssssssssss')
      // console.log(id)
      this.$router.push({
        path: '/car/carnews/carnewsdetail',
        query: { id }
      })
    }
  }
  // mounted() {
  //   console.log('sssssssssssss')
  //   console.log(useUserStore().news)
  //   console.log(this.newsList)
  // }
}
</script>

<template>
  <div class="news-container">
    <div v-for="newsItem in newsList" :key="newsItem.id" class="news-item">
      <div class="news-content" @click="handleClick(newsItem.id)">
        <img :src="newsItem.imgurl" :alt="newsItem.title" class="news-image" />
        <div class="news-text">
          <router-link
            :to="{
              path: '/car/carnews/carnewsdetail',
              query: { id: newsItem.id }
            }"
            class="news-title"
          >
            {{ newsItem.title }}
          </router-link>
          <p class="published-at">发布时间：{{ newsItem.publishdate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-container {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
}
.news-content:hover .news-image {
  transform: scale(1.1);
  transition: transform 0.3s;
}

.news-item {
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.news-item:hover {
  transform: scale(1.05);
}

.news-content {
  display: flex;
}

.image-container {
  overflow: hidden;
}

.news-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  transition: transform 0.3s;
}

.news-text {
  padding: 20px;
}

.news-image:hover,
.news-text:hover {
  transform: scale(1.1);
}

.news-text a {
  font-weight: 700;
  font-size: larger;
  color: rgb(50, 49, 49);
  text-decoration: none;
}

.published-at {
  font-style: italic;
  color: #888;
}
</style>
