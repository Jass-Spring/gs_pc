import axios from 'axios'

const searchPackagingTypeAPI = (params) => {
  return axios.post('PackagingType/search', params)
}

const addPackagingTypeAPI = (params) => {
  return axios.post('PackagingType', params)
}

const patchPackagingTypeAPI = (params) => {
  return axios.patch('PackagingType', params)
}

const deletePackagingTypeAPI = (params) => {
  return axios.delete('PackagingType', params)
}

const initPackagingTypeAPI = (params) => {
  return axios.get('PackagingType', params)
}

export {
  searchPackagingTypeAPI,
  addPackagingTypeAPI,
  patchPackagingTypeAPI,
  deletePackagingTypeAPI,
  initPackagingTypeAPI
}
