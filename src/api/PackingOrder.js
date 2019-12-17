import axios from 'axios'

const initPackingOrderAPI = (params) => {
  return axios.get('PackingOrder/Init', params)
}

const searchPackingOrderAPI = (params) => {
  return axios.post('PackingOrder/Search', params)
}

const getPackingOrderNosAPI = (params) => {
  return axios.get('PackingOrder/GetPackingOrderNos', params)
}

const deletePackingOrderAPI = (params) => {
  return axios.delete('PackingOrder', params)
}

const giveUpPackingOrderAPI = (params) => {
  return axios.post('PackingOrder', params)
}

const getSendGoodListAPI = (params) => {
  return axios.get('PackingOrder/GetSendGoodList', params)
}

export {
  initPackingOrderAPI,
  searchPackingOrderAPI,
  getPackingOrderNosAPI,
  deletePackingOrderAPI,
  giveUpPackingOrderAPI,
  getSendGoodListAPI
}
