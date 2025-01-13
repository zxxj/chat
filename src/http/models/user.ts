import { http } from '@/http'

const login = (data: any) => {
  return http.post('/signIn', data)
}

const register = (data: any) => {
  return http.post('/signUp', data)
}

const getTags = (params: any) => {
  return http.get('/tags/', { params })
}

export { login, register, getTags }
