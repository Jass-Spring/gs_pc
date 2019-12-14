import Vue from 'vue'
import {
  Button,
  Icon,
  Message,
  Form,
  FormItem,
  Input,
} from 'view-design'

Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)

Vue.prototype.$message = Message

import 'view-design/dist/styles/iview.css'
