import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '../../api/user'
import { findNewsService } from '../../api/user'
import { findCommentService } from '../../api/user'

//用户模块token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    //用户的信息，头像，名字。。。
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService() // 请求获取数据
      user.value = res.data.data
      // console.log('sssssssssssssssssss')
      // console.log(res.data.data)
      // console.log(user.value)
    }
    const setUser = (obj) => {
      user.value = obj
    }

    //文章的标题，发布时间，内容。。。
    const news = ref({})
    const selfnews = ref({})
    const findnews = async () => {
      const res = await findNewsService() // 请求获取数据
      // let locat=res.data.data
      // console.log('ddddddddddddddddddddddddd')
      // console.log(res.data.data)
      // console.log(news.value)
      // 使用 sort 方法对数组进行排序
      news.value = res.data.data.sort((a, b) => {
        // 将日期字符串转换为 Date 类型，并比较
        return new Date(b.publishdate) - new Date(a.publishdate)
      })
      // console.log(res.data.data) // 输出排序后的数组
    }
    const findselfnews = async (myusername) => {
      findnews() // 请求获取数据
      // console.log(myusername)
      // console.log(news.value)
      const myUserName = myusername
      function filterByUserName(myUserName) {
        return news.value.filter((item) => item.username == myUserName)
      }
      const result = filterByUserName(myUserName)
      selfnews.value = result
      // console.log(selfnews.value)
    }

    const comment = ref({})
    const overcomment = ref({})

    const fetchData = async () => {
      const res = await findCommentService()
      comment.value = res.data.data
    }

    const findcomment = async () => {
      await fetchData()
      console.log(comment.value)
    }

    const filtercomment = async (newsid) => {
      await fetchData()
      const myNewsId = newsid
      function filterByNewsId(myNewsId) {
        return comment.value.filter((item) => item.newsid == myNewsId)
      }
      const result = filterByNewsId(myNewsId)
      overcomment.value = result
      // console.log(overcomment.value)
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser,
      news,
      selfnews,
      findnews,
      findselfnews,
      comment,
      overcomment,
      findcomment,
      filtercomment
    }
  },
  { persist: true } //持久化
)
