import axios from 'axios'

// 解耦，最小知识原则：我只需要知道我要发起四种请求，不想知道请求是是用什么（ex: axios) 发起的, 并且可以统一配置
axios.defaults.baseURL = isDev ? '/' : 'http://152.32.233.140:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

export const ajax = {
  get: (path: string) => {
    return axios.get(path)
  },
  post: () => {},
  patch: () => {},
  delete: () => {},
}
