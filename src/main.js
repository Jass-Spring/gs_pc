import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import utils from './utils'
import './plugins/iview.js'
import './plugins/axios.js'
import './assets/style/global.less'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$utils = utils

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
