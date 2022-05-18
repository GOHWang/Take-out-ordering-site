<template>
  <div id="Login" :style="{height:height+'px'}">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MyLogin',
  // 数据
  data() {
    return {
      height: document.documentElement.clientHeight,
      comName: 'Login'
    }
  },
  // 组件第一次渲染页面节点
  mounted() {
    window.onresize = () => {
      // 获取视口高度
      this.height = document.documentElement.clientHeight
    }
  }
}
</script>

<style lang="less" scoped>
#Login {
  width: 100vw;
  background: radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%);
}
</style>