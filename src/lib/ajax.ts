import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

// 解耦，最小知识原则：我只需要知道我要发起四种请求，不想知道请求是是用什么（ex: axios) 发起的, 并且可以统一配置
// 静态配置用 default 配置
axios.defaults.baseURL = isDev ? '/' : 'http://152.32.233.140:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 5000

// 动态配置用拦截器
axios.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (config.headers && jwt) { config.headers.Authorization = `Bearer ${jwt}` }
  return config
})

// 封装 axios
export const ajax = {
  get: <T> (path: string, config?: AxiosRequestConfig<any> | undefined) => {
    return axios.get<T>(path, config)
  },
  post: <T> (path: string, data: JSONValue, config?: AxiosRequestConfig<any> | undefined) => {
    return axios.post<T>(path, data, config)
  },
  patch: () => {},
  delete: () => {},
}
