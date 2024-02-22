<template>
  <div class="news-container">
    <div class="news-section">
      <br />
      <h1 style="font-size: 3cap">{{ news.title }}</h1>
      <p>发布者: 发布者名称</p>
      <p>发布时间: 2022-01-01</p>
      <img src="../assets/login_bg1.jpg" alt="新闻图片" class="center" />
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
            <span class="username">{{ comment.username }}</span>
          </div>
          <p>{{ comment.text }}</p>
        </li>
      </ul>
      <p v-else class="no-comments">暂无评论</p>
      <a href="#h1">
        <button
          @click="toggleCommentInput"
          v-if="!showInput"
          class="add-comment-btn"
        >
          <span>添加评论</span>
        </button>
      </a>
      <transition name="fade">
        <div v-if="showInput" class="comment-input">
          <input
            type="text"
            id="h1"
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

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import { useRouter } from 'vue-router'

const router = useRouter()
console.log(router)
export default {
  data() {
    return {
      news: {
        title:
          '新闻标题打撒打撒达瓦酷酷酷酷酷酷酷酷酷看打撒打撒达瓦单位顶顶顶顶的哇哇哇哇哇哇哇哇',
        content:
          '新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容'
      },
      comments: [
        { id: 1, text: '这是一个很棒的新闻！', avatar: '', username: 'sss' },
        { id: 2, text: '期待更多类似的内容。', avatar: '', username: 'sss1' }
      ],
      showInput: false,
      newComment: ''
    }
  },
  methods: {
    toggleCommentInput() {
      this.showInput = !this.showInput
    },
    addComment() {
      if (this.newComment.trim() !== '') {
        this.comments.push({
          id: this.comments.length + 1,
          text: this.newComment
        })
        this.newComment = ''
        this.showInput = false
      }
    }
  }
}
</script>

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
</style>
