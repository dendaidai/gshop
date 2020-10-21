// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from "./router"
import store from "./store/index"
import {Button} from "mint-ui"

Vue.config.productionTip = false

//注册为全局组件
Vue.component(Button.name,Button)   //标签名mt-button

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
