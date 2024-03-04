import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reguser', { username, password, repassword })

// 登录接口
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 获取用户基本信息
export const userGetInfoService = () => request.get('/my/userinfo')

// 更新用户基本信息
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })
//更新用户发表的信息的nickname
export const userUpdatenicknameService = ({ username, nickname }) =>
  request.put('/article/update', { username, nickname })

// 更新用户头像
export const userUpdateAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

// 更新用户密码
export const userUpdatePasswordService = ({ oldpwd, newpwd, repwd }) =>
  request.patch('/my/updatepwd', { oldpwd, newpwd, repwd })

// 增加发布文章数据接口
export const addNewsService = ({
  title,
  writedate,
  publishdate,
  imgurl,
  content,
  nickname,
  username
}) =>
  request.post('/article/add', {
    title,
    writedate,
    publishdate,
    imgurl,
    content,
    nickname,
    username
  })

//查询发布文章数据接口
export const findNewsService = () => request.get('/article/find')

// 增加发布评论数据接口
export const addCommentService = ({
  newsid,
  avatar,
  username,
  text,
  nickname
}) =>
  request.post('/comment/add', {
    newsid,
    avatar,
    username,
    text,
    nickname
  })

//查询评论数据接口
export const findCommentService = () => request.get('/comment/find')
