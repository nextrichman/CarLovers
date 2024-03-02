import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'

//历史模式 createWebHistory 地址不带#
//hash模式 createWebHashHistory 带#
//vite进行打包需要调成hash模式才能以file协议访问，//yarn add @vitejs/plugin-legacy，yarn add terser,需要在vite.config中plugin导入
// 而且vite 默认使用 ES Module 模块是不支持file协议的，需要使用插件来配置之后才可以正常使用file协议打开。
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), //'/jd'可在前面增加地址
  routes: [
    //把component弄成异步组件可以实现路由懒加载，使用哪个一个组件才加载，按需加载testdemo。
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutBox.vue'),
      redirect: '/car/carnews',
      children: [
        {
          path: '/car/carnews',
          component: () => import('@/views/car/CarNews.vue')
        },
        {
          path: '/car/carnews/carnewsdetail',
          component: () => import('@/views/car/components/CarNewsDetail.vue')
        },
        {
          path: '/car/newsmanage',
          component: () => import('@/views/car/NewsManage.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar .vue')
        },
        {
          path: '/user/detail',
          component: () => import('@/views/user/UserDetail.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截 => 默认是直接放行的
// 根据返回值决定，是放行还是拦截
// 返回值：
// 1. undefined / true  直接放行
// 2. false 拦回from的地址页面
// 3. 具体路径 或 路径对象  拦截到对应的地址
//    '/login'   { name: 'login' }
router.beforeEach((to, from, next) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') {
    next('/login')
  } else {
    // 用户已登录或访问登录页，直接放行
    next()
  }
})
export default router
