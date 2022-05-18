import Vue from 'vue'
import Vuex from 'vuex' // 引入Vuex
import coffeeList from '@/components/lists'
Vue.use(Vuex) // 应用Vuex插件

// 遍历搜索数组
const newList = []
const ItemList = coffeeList
ItemList.forEach((item) => {
  item.item.forEach(item => {
    newList.push({ value: item.kname })
  })
})

const actions = {
  jiaOdd(context, value) {
    // 先判断再修改调用WAIMAI函数
    if (value === 0) {
      context.commit('WAIMAI', value)
    }
    if (value === 1) {
      context.commit('WAIMAI', value)
    }
    if (value === 2) {
      context.commit('WAIMAI', value)
    }
  }
} // 准备actions——用于响应组件中的动作

const mutations = {
  // 签到积分
  SINGIN(state, value) {
    state.jifen += value
  },
  // 搜索框为空
  SOUSUO(state, value) {
    if (value == '' || value == 'refresh') {
      state.searchList = []
      let rom = Math.floor(Math.random() * 7)
      coffeeList.some(item => {
        state.searchList.push(item.item[rom])
      })

      return
    }

  },
  // 点击搜索
  SOUSUOCLICK(state, value) {
    if (value !== '') {
      state.searchList = []
      coffeeList.some(item => {
        if (item.name.indexOf(value) > -1) {
          state.searchList.push(...item.item)
          return true
        }
        item.item.some(item => {
          if (item.kname.indexOf(value) > -1) {
            state.searchList.push(item)
          }
        })
      })
    }
  },
  // 删除加号
  REMOVEADD(state, value) {
    state.coffeeList = state.coffeeList.filter(val => {
      if (val.kid === value.kid) {
        val.clickNum = false
      }
      return val
    })
  },
  ADD(state, value) {
    // console.log(value);
    let newData = JSON.parse(JSON.stringify(value))
    // let orderList = { ...value }
    state.sum.push(newData)
    coffeeList.some(item => {
      item.item.some(item => {
        item.clickNum = true
        item.sum = 1
      })
    })

  },
  WAIMAI(state, value) {
    // 点击
    state.sum1 = [];
    state.sum.filter(item => {
      if (item.options === value) {
        state.sum1.unshift(...item.data)
      }
      if (value === 0) {
        state.sum1.unshift(...item.data)
        state.sum1Lenght = state.sum1.length
      }
    })
  },
} // 准备mutations——用于操作数据(state)
const state = {
  sum: [],
  sum1: [],
  coffeeList: coffeeList[5].item,
  sum1Lenght: 0,
  // 手机号
  shoujihao: localStorage.getItem('token'),
  // 搜索商品列表
  listItem: newList,
  // 搜索大数组
  searchList: [],
  // 积分
  jifen: 0
} // 准备state——用于存储数据

// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})