<!-- <script setup></script>

<template>
  <div>新车资讯详情</div>
</template>

<style scoped></style> -->

<script>
export default {
  data() {
    return {
      newsList: [
        {
          id: 1,
          title: '精彩大事件1打撒打撒达瓦都是的味道',
          time: '2022-01-01T08:00:00',
          imageUrl: 'news1.jpg'
        },
        {
          id: 2,
          title: '热点新闻2',
          time: '2022-01-02T12:00:00',
          imageUrl: 'news2.jpg'
        }
        // 可以继续添加更多新闻项目
      ]
    }
  },
  methods: {
    formatDate(dateTimeString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateTimeString).toLocaleDateString('en-US', options)
    }
  }
}
</script>

<template>
  <div class="news-container">
    <div v-for="newsItem in newsList" :key="newsItem.id" class="news-item">
      <div class="news-content">
        <img
          src="../../assets/login_bg1.jpg"
          :alt="newsItem.title"
          class="news-image"
        />
        <div class="news-text">
          <a href="http://localhost:5173/jd/car/carnews/carnewsdetail">{{
            newsItem.title
          }}</a>
          <p class="published-at">{{ newsItem.time }}</p>
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
