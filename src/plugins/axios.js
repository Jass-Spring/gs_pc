import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASEURL
axios.interceptors.request.use(config => {
  config.headers['access-token'] = sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(response => {
  if (!response.data.success) {
    Vue.prototype.$message.error(response.data.message)
  }

  return response
}, error => {
  if (error.response) {
    Vue.prototype.$message.error('网络请求出错：' + error.response.status)
  } else {
    Vue.prototype.$message.error(error.message)
  }

  // return Promise.reject(error);
  return {
    data: {
      success: false
    }
  }
})
