<script>
import '@fortawesome/fontawesome-free/css/all.css'
import { useUserStore } from '@/stores'
import { addCommentService } from '@/api/user'

export default {
  data() {
    return {
      news: {},
      comments: [],
      upcomments: { newsid: null, avatar: '', username: '', text: '' },
      // a: { newsid: 6 },
      showInput: false,
      newComment: ''
    }
  },
  methods: {
    // toggleCommentInput() {
    //   this.showInput = !this.showInput
    //   this.$refs.commentInput.scrollIntoView() // 滚动到评论输入框
    // },
    toggleCommentInput() {
      this.showInput = !this.showInput
      if (this.showInput) {
        this.$nextTick(() => {
          this.$refs.commentInput.scrollIntoView()
          this.$refs.commentInput.focus()
        })
      }
    },
    async addComment() {
      if (this.newComment.trim() !== '') {
        this.comments.push({
          id: this.comments.length + 1,
          text: this.newComment
        })
        this.showInput = false
      }
      this.upcomments.avatar = useUserStore().user.user_pic
      this.upcomments.username = useUserStore().user.username
      this.upcomments.text = this.newComment
      // console.log(this.upcomments.avatar)
      // console.log(this.upcomments.username)
      // console.log(this.upcomments.text)
      // console.log(this.upcomments)
      await addCommentService(this.upcomments)
      // 通知 user 模块，进行数据的更新
      // useUserStore().findcomment()
      await useUserStore().filtercomment(Number(this.upcomments.newsid))
      this.comments = useUserStore().overcomment
      // console.log(this.comments)
      // console.log(this.a.newsid)
      // 提示用户
      console.log(useUserStore().comment)
      ElMessage.success('评论成功')
    }
  },
  mounted() {
    //获取传过来的id及将对应其id的news(store仓库)的数据赋值给this.news
    let id = this.$route.query.id
    this.upcomments.newsid = this.$route.query.id
    // console.log(id)
    // console.log(useUserStore().user.username)
    // console.log(useUserStore().news)
    const foundIndex = useUserStore().news.findIndex((news) => news.id == id)
    // console.log(foundIndex)
    this.news = useUserStore().news[foundIndex]
    // useUserStore().findcomment()
    useUserStore()
      .filtercomment(Number(this.upcomments.newsid))
      .then(() => {
        this.comments = useUserStore().overcomment
      })
  }
}
</script>

<template>
  <div class="news-container">
    <div class="news-section">
      <br />
      <h1 style="font-size: 3cap">{{ news.title }}</h1>
      <p>发布者: {{ news.nickname }}</p>
      <p>发布时间: {{ news.publishdate }}</p>
      <img :src="news.imgurl" alt="新闻图片" class="center" />
      <p>{{ news.content }}</p>
      <router-link to="/" class="back-btn">
        <i class="fa fa-arrow-left"> 返回</i>
      </router-link>
    </div>

    <div class="comment-section">
      <h2>评论</h2>
      <ul v-if="comments.length > 0" class="comment-list">
        <li v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="user-info">
            <img :src="comment.avatar" alt="User Avatar" class="avatar" />
            <div>
              <span class="username">{{ comment.username }}</span>
              <p>{{ comment.text }}</p>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="no-comments">暂无评论</p>
      <!-- <a href="#h1"></a> 在hash模式里不能用这种#h1的锚点会导致跳转页面/#/h1，会误以为是前缀 -->
      <button
        @click="toggleCommentInput"
        v-if="!showInput"
        class="add-comment-btn"
      >
        <span>添加评论</span>
      </button>

      <transition name="fade">
        <div v-if="showInput" class="comment-input">
          <input
            type="text"
            ref="commentInput"
            v-model="newComment"
            placeholder="输入评论"
            class="comment-text"
          />
          <button @click="addComment" class="submit-comment-btn">
            提交评论
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.news-container {
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
  position: relative; /* 添加相对定位 */
}
.back-btn {
  position: fixed;
  top: 80px;
  left: 240px;
  color: #000;
  text-decoration: none;
  font-size: 24px;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.username {
  font-weight: bold;
}
.comment-input {
  position: relative;
  margin-top: 20px;
}

.comment-text {
  width: 85%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.comment-text:focus {
  border-color: #6c5ce7;
}

.submit-comment-btn {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: #6c5ce7;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-comment-btn:hover {
  background-color: #4834d4;
}

.comment-section {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add-comment-btn {
  background: linear-gradient(45deg, #11998e, #38ef7d);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 6px 20px rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;
  position: fixed;
  right: 100px;
  bottom: 100px;
}

.add-comment-btn:hover {
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.19);
}

.add-comment-btn {
  background: linear-gradient(45deg, #11998e, #38ef7d);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 6px 20px rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;
}

.add-comment-btn:hover {
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.19);
}
.comment-item {
  list-style: none; /* 删除列表前面的点 */
}

.comment-item .user-info {
  display: flex; /* 使用弹性布局使得图片和用户名/评论水平排列 */
  align-items: flex-start; /* 垂直居顶对齐 */
  margin-bottom: 12px; /* 调整评论项之间的间距 */
}

.comment-item img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加图片阴影效果 */
}

.comment-item .username {
  font-weight: bold;
  font-size: 0.9em; /* 将 username 字体大小设为 0.9em */
}

.comment-item p {
  padding: 10px;
  border-radius: 15px;
  position: relative;
  background-color: #dadada; /* 设置评论框的背景颜色 */
  margin-top: 6px; /* 调整评论框与用户名之间的间距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加评论框阴影效果 */
}
</style>
