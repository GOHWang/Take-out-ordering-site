<template>
  <div id="MyOrder">
    <!-- 回首页 -->
    <el-page-header @back="goBack" content="订单页面" title="回首页">
    </el-page-header>
    <!-- 导航 -->
    <el-menu default-active="1" class="el-menu-vertical-demo" collapse>
      <el-menu-item index="1" @click="addIndex(0)">
        <i class="el-icon-menu"></i>
        <span slot="title">全部</span>
      </el-menu-item>
      <el-menu-item index="2" @click="addIndex(1)">
        <i class="el-icon-bicycle"></i>
        <span slot="title">外卖</span>
      </el-menu-item>
      <el-menu-item index="3" @click="addIndex(2)">
        <i class="el-icon-knife-fork"></i>
        <span slot="title">到店</span>
      </el-menu-item>
      <!-- <el-menu-item index="4">
        <i class="el-icon-hot-water"></i>
        <span slot="title">咖啡</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">待评价</span>
      </el-menu-item> -->
    </el-menu>
    <!-- 主要内容 -->
    <div class="mainBox">
      <el-empty :image-size="320" :image="require('@/assets/images/nullzhuangtai.png')" description="这里还没有订单哦，要饿肚子了~" v-if="sum1.length === 0">
        <el-button type="primary" @click="goBack">去下单</el-button>
      </el-empty>
      <div class="bigOrder" v-else>
        <!-- 循环项 -->
        <div class="order" v-for="(item,index) in sum1" :key="index">
          <p class="title">
            <span class="titleLeft">{{ item.kname }}</span>
            <span class="titleRight">已消费
              <span style="color:#fd7e14;font-size:14px" class="ml-1" v-if="indexs === 1">(外卖)</span>
              <span style="color:#28a745;font-size:14px" class="ml-1" v-if="indexs === 2">(到店)</span>
            </span>
          </p>
          <el-divider></el-divider>
          <el-image :src="item.image" class="orderImgs"></el-image>
          <div class="information">
            <p class="mt-3 time">订单编号:{{ form }}</p>
            <p class="mt-4 sumsw">×{{ item.sum }}</p>
          </div>
          <div class="preve">
            <span style="font-size:14px">总价&nbsp;</span>
            <span class="preveSpan">￥{{ item.sum * parseFloat(item.kprice) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div id="pinglun">
      <!--  -->
      <div id="pinglunbuju">
        <!-- 评价弹窗 -->
        <el-popover placement="top" title="服务评价" width="180" v-model="visible" v-if="quess">
          <p class="mt-3 mb-3">
            <el-rate v-model="value" show-text :colors="colors">
            </el-rate>
          </p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="sussfd">确定</el-button>
          </div>
          <el-button plain slot="reference"><img src="@/assets/images/pingjia.png" style="width:20px"></el-button>
        </el-popover>
        <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}" style="display:inline-block;" v-else>
        </el-rate>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import bus from '@/eventBus.js'
export default {
  name: 'MyOrder',
  data() {
    return {
      quess: true,
      visible: false,
      value: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      homeId: 1,
      newlist: [],
      indexs: 0,
      form: 0
    }
  },
  methods: {
    sussfd() {
      this.quess = false
      this.visible = false
    },
    addIndex(index) {
      this.indexs = index
      this.$store.dispatch('jiaOdd', index)
    },
    goBack() {
      this.$router.push('/home')
      bus.$emit('backhome', this.homeId)
    },
    // 获取当前日期的方法
    getProjectNum() {
      const projectTime = new Date() // 当前中国标准时间
      const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
      const Month = projectTime.getMonth() + 1 // 获取中国区月份
      const Day = projectTime.getDate() // 获取几号
      var CurrentDate = Year
      if (Month >= 10) {
        // 判断月份和几号是否大于10或者小于10
        CurrentDate += Month
      } else {
        CurrentDate += '0' + Month
      }
      if (Day >= 10) {
        CurrentDate += Day
      } else {
        CurrentDate += '0' + Day
      }
      return CurrentDate
    }
  },
  activated() {
    this.addIndex(0)
  },
  created() {
    this.form = this.getProjectNum() + Math.floor(Math.random() * 10000)
  },
  mounted() {
    document.documentElement.scrollTop = 0
  },
  computed: {
    ...mapState(['sum1'])
  }
}
</script>

<style lang="less" scoped>
#MyOrder {
  width: 100%;
  padding-top: 15px;
  .el-menu {
    position: fixed;
    top: 25%;
    left: 0;
  }
  #pinglun {
    width: 70%;
    margin: 5px auto 0;
    height: 80px;
    overflow: hidden;
    text-align: right;
    #pinglunbuju {
      width: 180px;
      float: right;
    }
  }
  .mainBox {
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 15px auto 0;
    padding: 10px 20px;
    width: 60%;
    height: 500px;
    background-color: white;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    &::-webkit-scrollbar {
      display: none;
    }
    .bigOrder {
      width: 100%;
      margin: 10px 0;
      padding: 0 10px 10px;
      border: 1px solid #dcdfe6;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      .sumPrices {
        padding-right: 30px;
        text-align: right;

        .yfzj {
          font-size: 14px;
          .sumnum {
            font-family: serif;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
      .order {
        overflow: hidden;
        margin: 10px auto 10px;
        padding: 0 20px;
        width: 100%;
        height: 150px;
        background-color: white;
        border: 1px solid #dcdfe6;
        // 右侧价格栏
        .preve {
          float: right;
          margin-top: 40px;
          height: 60px;
          line-height: 60px;
          .preveSpan {
            font-size: 17px;
            font-weight: 600;
            vertical-align: bottom;
          }
        }
      }
      .information {
        margin-left: 10px;
        float: left;
      }
      .sumsw {
        font-style: italic;
      }
      .time {
        font-size: 14px;
      }
      .el-divider {
        margin: 13px 0 0;
      }
      .title {
        width: 100%;
        padding: 10px 10px 0;
        overflow: hidden;
      }
      .titleLeft {
        float: left;
        font-family: 'Hiragino Sans GB';
        font-size: 17px;
        font-weight: 600;
      }
      .titleRight {
        float: right;
        color: #f00019;
      }
      .orderImgs {
        float: left;
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>