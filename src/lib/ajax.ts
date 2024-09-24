import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLoadingStore } from '../stores/useLoadingStore'

// let hasSetup = false

// export const setUp = () => {
//   if (hasSetup) { return }
//   hasSetup = true
//   // 解耦，最小知识原则：我只需要知道我要发起四种请求，不想知道请求是是用什么（ex: axios) 发起的, 并且可以统一配置
//   // 静态配置用 default 配置
//   axios.defaults.baseURL = isDev ? '/' : 'http://152.32.233.140:3000'
//   axios.defaults.baseURL = 'http://152.32.233.140:3000'
//   axios.defaults.headers.post['Content-Type'] = 'application/json'
//   axios.defaults.timeout = 5000

//   // 动态配置用拦截器
//   axios.interceptors.request.use((config) => {
//     const jwt = localStorage.getItem('jwt') || ''
//     config.headers = config.headers || {}
//     if (config.headers && jwt) { config.headers.Authorization = `Bearer ${jwt}` }
//     return config
//   })
// }

const axiosInstance = axios.create({
  baseURL: isDev ? 'http://152.32.233.140:3000' : 'http://152.32.233.140:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})
axiosInstance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (config.headers && jwt) { config.headers.Authorization = `Bearer ${jwt}` }
  return config
})

export { axiosInstance as ajax }

// 封装 axios
type Options = {
  showLoading?: boolean
  handleError?: boolean
}

export const useAjax = (options?: Options) => {
  const showLoading = options?.showLoading || false // undefined null false 0 NaN '' 会取后面的值
  const handleError = options?.handleError ?? true // undefined 或者 null 会取后面的值
  const { setVisible } = useLoadingStore()

  const nav = useNavigate()
  const table: Record<string, undefined | ((error?: AxiosError) => void)> = {
    401: () => {
      nav('/sign_in')
    },
    402: () => {
      console.error('没付费')
    },
    403: () => {
      console.error('没授权')
    },
    unknown: (error) => {
      console.error(`接口出错啦！${JSON.stringify(error)}`)
    },
  }
  const onHttpError = (error: AxiosError) => {
    if (error.response && handleError) {
      const { status } = error.response
      const fn = table[status] || table.unknown
      fn?.(error)
    }
    throw error
  }
  // Get show hide
  const ajax = {
    get: <T> (path: string, config?: AxiosRequestConfig<any> | undefined) => {
      if (showLoading) { setVisible(true) }
      return axiosInstance.get<T>(path, config).catch(onHttpError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    post: <T> (path: string, data: JSONValue, config?: AxiosRequestConfig<any> | undefined) => {
      if (showLoading) { setVisible(true) }
      return axiosInstance.post<T>(path, data, config).catch(onHttpError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    patch: <T> (path: string, data: JSONValue, config?: AxiosRequestConfig<any> | undefined) => {
      if (showLoading) { setVisible(true) }
      return axiosInstance.patch<T>(path, data, config).catch(onHttpError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    destory: <T> (path: string, config?: AxiosRequestConfig<any> | undefined) => {
      if (showLoading) { setVisible(true) }
      return axiosInstance.delete<T>(path, config).catch(onHttpError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
  }
  return ajax
}
