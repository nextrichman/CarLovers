import axios from 'axios'
import { useUserStore } from '@/stores'
// import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://127.0.0.1:3000'

//一开始以为请求载荷就是post请求里的表单数据，后面才发现这两个在浏览器的请求中是有区别的：
// axios如果直接传对象，不指定是表单数据的话，会自动帮你转成json字符串给后端（后端可以使用@RequestBody接收参数，我试过使用Map可以接收到前端两个参数）
// 指定了表单数据头部的话，才会传表单数据

const header = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
}

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000,
  headers: header
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 摘取核心响应数据
    if (res.data.status === 0) {
      return res
    }
    // TODO 3. 处理业务失败
    // 处理业务失败, 给错误提示，抛出错误
    ElMessage.error(res.data.message || '服务异常')
    if (res.data.message === '身份认证失败！') {
      router.push('/login')
    }
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    // 错误的特殊情况 => 401 权限不足 或 token 过期 => 拦截到登录
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // // 错误的默认情况 => 只要给提示
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
