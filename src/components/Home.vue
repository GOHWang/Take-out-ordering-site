<template>
  <div id="navs">
    <el-container id="tops" :class="shows?'ty':''">
      <el-header class="herdder">
        <MyHeader @boolsChange="getNewBool"></MyHeader>
      </el-header>
    </el-container>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footer id="footers">
      <div id="footTop">
        <div id="logoleft">
          <img src="@/assets/images/logo3.png" id="footBigLogo">
          <span id="logoTitle">叉子汉堡</span>
        </div>
        <div id="logoRight">
          <div class="sucaiBox">
            <p class="sucai">商品素材取自:麦当劳官网</p>
            <p class="sucai">让网上订餐更轻松</p>
          </div>
        </div>
      </div>
      <div id="footbottom"><img src="@/assets/images/footlogo.png">基于Vue的订餐网站</div>
    </footer>
    <el-backtop>
    </el-backtop>
  </div>
</template>

<script>
import MyCarousel from './Homes/MyMain/MyCarousel.vue'
import MyHeader from './Homes/MyHeader.vue'
export default {
  name: 'Home',
  data() {
    return {
      shows: null
    }
  },
  mounted() {
    this.getNewBool
  },
  methods: {
    getNewBool(val) {
      this.shows = val
    }
  },
  components: { MyCarousel, MyHeader }
}
</script>

<style lang="less" scoped>
.ty {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#tops {
  width: 100%;
  height: 90px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: white;
  border-bottom: 1px solid #dcdfe6;
  .herdder {
    margin: 0 auto;
    width: 940px;
    top: 0;
    height: 100% !important;
  }
}
#navs {
  padding-top: 90px;
  #footers {
    margin-top: 50px;
    width: 100%;
    height: 367px;
    background: url('@/assets/images/footer.jpg') no-repeat center center;
    background-size: cover;
    #footTop {
      margin: 0 auto;
      padding: 50px 15px 0;
      width: 1200px;
      height: 300px;
      display: flex;
      // 右边
      #logoRight {
        flex: 1;
        position: relative;
        .sucaiBox {
          bottom: 15px;
          right: 15px;
          position: absolute;
          .sucai {
            font-size: 13px;
            text-align: center;
            color: white;
          }
        }
      }
      #logoleft {
        flex: 1;
        #logoTitle {
          font-family: Microsoft JhengHei;
          margin-left: 5px;
          font-size: 25px;
          color: #fff;
          vertical-align: middle;
        }
        #footBigLogo {
          width: 38px;
        }
      }
    }
    #footbottom {
      line-height: 67px;
      text-indent: 0.5em;
      font-size: 13px;
      color: #c0c4cc;
      margin: 0 auto;
      width: 1200px;
      height: 67px;
      img {
        width: 38px;
        margin-right: 10px;
      }
    }
  }
}
</style>