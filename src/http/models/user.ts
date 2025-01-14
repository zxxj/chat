import { http } from '@/http'

// 登录
export const login = (data: any) => {
  return http.post('/signIn', data)
}

// 注册
export const register = (data: any) => {
  return http.post('/signUp', data)
}

// 获取标签
export const getTags = (params: any) => {
  return http.get('/tags/', { params })
}

// 更新用户信息
export const updateUserInfo = (data: any) => {
  return http.post('/user/update', data)
}

// 检查用户名是否可用
export const isUsernameAvailable = (username: string) => {
  return http.get(`/user/isUsernameAvailable?username=${username}`)
}

// 根据token获取用户信息
export const user = () => {
  return http.get('/user/me')
}
