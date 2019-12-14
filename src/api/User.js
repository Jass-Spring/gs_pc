import axios from 'axios'

const loginAPI = (params) => {
  return axios.post('User/logon', params)
}

export {
  loginAPI
}