import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { store } from '@/store'

// 创建请求实例
const instance: AxiosInstance = axios.create({
  baseURL: 'http://49.234.200.97:8080', // 设置基础URL
  timeout: 10000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 store 中获取 token
    debugger
    const token = store.getState().user.userInfo.token
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      config.headers.Authorization = ''
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    // const { data } = response
    // // 可以根据后端返回的状态码或其他标识进行统一处理
    // if (data.code === 200) {
    //   return data
    // }
    debugger
    if (response.data || response.data === '') {
      return response.data
    } else {
      return response
    }
    // return Promise.reject(new Error(data || '请求失败'))
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，跳转到登录页
          // router.push('/login')
          break
        case 403:
          // 权限不足
          break
        case 404:
          // 请求不存在
          break
        case 500:
          // 服务器错误
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

// 封装请求方法
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config)
  },

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config)
  },

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, config)
  },

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.patch(url, data, config)
  }
}

// 导出类型
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse }

// 导出实例
export default instance
