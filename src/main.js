import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import http from 'axios'
import { Button, Select, Container, Aside, Header, Main, Menu, MenuItemGroup, MenuItem, Submenu, Dropdown, DropdownItem, DropdownMenu, Row, Col, Card, Table, TableColumn } from 'element-ui'
// import tab from './store/tab'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
// Vue.use(ElementUI)
Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.prototype.$http = http

if (process.env.NODE_ENV === 'development') require('@/api/mock')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
