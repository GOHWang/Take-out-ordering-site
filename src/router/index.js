// 1. 导入 Vue和 VueRouter 的包
import Vue from "vue";
import VueRouter from "vue-router";
// 导入MyLogin模块
import MyLogin from '@/components/MyLogin.vue'
import Login from '@/components/Login/Login.vue'
import Register from '@/components/Login/Register.vue'
import Home from '@/components/Home.vue'
// MyMain
import MyCarousel from '@/components/Homes/MyMain/MyCarousel.vue'
import MyMall from '@/components/Homes/MyMain/MyMall.vue'
import MyOrder from '@/components/Homes/MyMain/MyOrder.vue'
import MyCenter from '@/components/Homes/MyMain/MyCenter.vue'
// 2. 调用 Vue.use() 函数，把VueRouter 安装为 Vue的插件
Vue.use(VueRouter);

// 3. 创建路由的实例对象
const router = new VueRouter({
  // 指定MyLogin模块
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/login',
    component: MyLogin,
    children: [{
      path: '',
      component: Login
    },
    {
      path: 'register',
      component: Register
    }
    ]
  }, {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: MyCarousel
    }, {
      path: 'mymall',
      component: MyMall
    }, {
      path: 'myorder',
      component: MyOrder
    }, {
      path: 'mycenter',
      component: MyCenter
    }]
  }]
});

// 控制访问权限
router.beforeEach(function (to, from, next) {
  const pathArr = ['/home', '/home/mymall', '/home/myorder', '/home/mycenter']
  if (pathArr.indexOf(to.path) != -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 4. 向外共享路由的实例对象

export default router;