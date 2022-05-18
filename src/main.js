import Vue from 'vue'
import App from './App.vue'
// 导入路由模块
import router from '@/router/index.js'
// 导入全局css样式
import '@/assets/css/index.css'
// 导入ElementUI组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入css动画样式
import 'animate.css'
// 引入store
import store from '@/store'

Vue.config.productionTip = false

// 注册为vue的插件
Vue.use(ElementUI);

// 回到顶部
router.afterEach((to, from, next) => {
  window,
  scrollTo(0, 0)
})

new Vue({
  render: h => h(App),
  // 挂载路由模块
  router,
  store
}).$mount('#app')