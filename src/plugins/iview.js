import Vue from 'vue'
import {
  Button,
  Icon,
  Message,
  Form,
  FormItem,
  Input,
  Layout,
  Header,
  Sider,
  Content,
  Menu,
  Submenu,
  MenuItem
} from 'view-design'

Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Layout', Layout)
Vue.component('Header', Header)
Vue.component('Sider', Sider)
Vue.component('Content', Content)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)

Vue.prototype.$message = Message

import 'view-design/dist/styles/iview.css'
