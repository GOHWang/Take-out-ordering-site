<template>
  <div id="MyShopping">
    <ul id="xuanze">
      <li class="wmzq" :class="waimai === 1? 'addclass':''" @click="waimai = 1"><img src="@/assets/images/wm.png">
        <span class="el-icon-success" v-if="waimai === 1"></span>
        <p>外卖</p>
      </li>
      <li class="wmzq" :class="waimai === 2? 'addclass':''" @click="waimai = 2"><img src="@/assets/images/ziqu.png">
        <span class="el-icon-success" v-if="waimai === 2"></span>
        <p>到店</p>
      </li>
      <li class="qingkong" @click="removeSpList">
        <img src="@/assets/images/clear.png" class="clearimg">
        <p>一键清空</p>
      </li>
      <li class="jiesuan" @click="settlement">
        <span class="el-icon-success cartt"></span>
        <p class="jiesuanwz">结算</p>
      </li>
    </ul>

    <div class="ddxqlg">
      <p class="cpxq">订单确认</p>
      <ul class="ul">
        <el-empty description="暂无订单记录" style="padding:70px 0" v-if="spList.length === 0"></el-empty>
        <!-- 循环项 -->
        <transition-group appear name="animate__animated animate__bounce" enter-active-class="animate__bounceInDown" leave-active-class="animate__backOutUp">
          <li class="ulli" v-for="item in spList" :key="item.kid">
            <img :src="item.image" class="ulliimg">
            <div class="listname">
              <el-tooltip :content="item.kname" placement="top" effect="light">
                <p class="listNameTitle">{{ item.kname }}</p>
              </el-tooltip>

              <p class="listNamePrice">￥{{ parseFloat(item.kprice).toFixed(1) }}</p>
            </div>
            <!-- 删除商品 -->
            <div class="el-icon-close gbUlli" @click="open(item)"></div>
            <div class="jiajian">
              <!-- 减 -->
              <span class="el-icon-remove-outline jj" style="color:#909399" @click="subs(item)"></span>
              <span class="jiajianwz">{{ item.sum }}</span>
              <span class="el-icon-circle-plus jj" style="color:#f00019" @click="adds(item)"></span>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>

    <div class="preces">
      <el-tooltip :content="heji" placement="bottom" effect="light">
        <div class="dashagua" v-text="heji<10?heji:'10+'">
        </div>
      </el-tooltip>
      合计
      <span id="priceSums">￥{{ parseFloat(priceSum).toFixed(1) }}</span>
      <span class="dbf" v-if="waimai === 1">配送费￥10</span>
    </div>
    <!-- 结算 -->

    <el-dialog title="订单支付" :visible.sync="outerVisible" :lock-scroll="false" width="30%" center>
      <el-dialog width="20%" title="选择支付方式" center :visible.sync="innerVisible" :lock-scroll="false" append-to-body style="padding-top:10px">
        <el-divider></el-divider>
        <el-table :data="tableData" style="width: 95%;margin:0 auto;cursor: pointer;" :show-header="false" highlight-current-row @current-change="handleCurrentChange">
          <el-table-column width="50">
            <template slot-scope="scope">
              <img :src="scope.row.date" class="tableimg">
            </template>
          </el-table-column>
          <el-table-column prop="name" width="190">
          </el-table-column>
        </el-table>
      </el-dialog>
      <p class="dingdanzhifu1">￥{{ priceSum }}&nbsp;</p>
      <p class="dingdanzhifu2">订单编号&nbsp;{{ form }}</p>
      <el-divider></el-divider>
      <ul class="zffs" @click="innerVisible = true">
        <li class="ulli1">支付方式</li>
        <li class="ulli2">
          <img :src="zhifufs.date" class="ulli2zffs">
          <span class="channels">{{ zhifufs.name }}</span>
          <span class="el-icon-arrow-right"></span>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="confirm">确认支付</el-button>
      </div>
    </el-dialog>
    <!-- 支付loging -->
    <div class="logingbox" v-if="logingShow">
      <img src="@/assets/images/logozhifu.gif" class="loging">
    </div>
    <!-- 支付成功loging -->
    <div v-loading.fullscreen="loading" class="xianshiloging" element-loading-text="支付成功，正在跳转..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
  </div>

</template>

<script>
import bus from '@/eventBus.js'
export default {
  name: 'MyShopping',
  data() {
    return {
      // 订单编号
      form: 0,
      loading: false,
      logingShow: false,
      spList: [],
      // 外卖堂食选取值
      waimai: 1,
      outerVisible: false,
      innerVisible: false,
      zhifufs: { name: '微信支付', date: require('@/assets/images/weixinzhifu.png') },
      tableData: [
        {
          date: require('@/assets/images/weixinzhifu.png'),
          name: '微信支付'
        },
        {
          date: require('@/assets/images/zhifubaozhifu.png'),
          name: '支付宝支付'
        },
        {
          date: require('@/assets/images/youzhengyinhang.png'),
          name: '中国邮政储蓄卡(3999)'
        },
        {
          date: require('@/assets/images/lingqian.png'),
          name: '零钱'
        }
      ]
    }
  },
  methods: {
    // 随机订单
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
    },
    // 确认支付
    confirm() {
      this.$store.commit('ADD', { data: this.spList, options: this.waimai })
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.outerVisible = false
        this.$router.push('home/myorder')
        bus.$emit('backhome', 3)
        bus.$emit('removeCardsItem', { res2: false })
        this.spList = []
      }, 2000)
    },
    // 选中的支付方式
    handleCurrentChange(val1) {
      this.zhifufs = { ...val1 }
      this.innerVisible = false
    },
    // 结算
    settlement() {
      this.form = this.getProjectNum() + Math.floor(Math.random() * 10000)
      if (this.spList.length == 0) {
        this.$notify({
          title: '提示',
          message: '购物车还是空的哦,快去选购吧！',
          type: 'warning',
          offset: 200
        })
        return
      }

      this.logingShow = true
      setTimeout(() => {
        this.outerVisible = true
        this.logingShow = false
      }, 1500)
    },
    // 一键清空
    removeSpList() {
      if (this.spList.length === 0) {
        this.$notify({
          title: '提示',
          message: '购物车还是空的哦,快去选购吧！',
          type: 'warning',
          offset: 200
        })
        return
      }
      this.$confirm('一旦操作无法恢复, 是否继续?', '一键清空', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        lockScroll: false
      })
        .then(() => {
          // 传值并清空
          bus.$emit('removeCardsItem', { res2: true })
          this.spList = []
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 增加
    adds(val) {
      val.sum++
    },
    // 减少
    subs(val) {
      if (val.sum > 1) {
        val.sum--
        return
      } else {
        this.open(val)
      }
    },
    open(val) {
      this.$confirm('此操作会删除此商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      })
        .then(() => {
          bus.$emit('removeCardsItem', { res2: val })
          val.sum = 1
          this.spList = this.spList.filter(item => {
            return item.kid !== val.kid
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getlist() {
      bus.$on('addCardsItem', item => {
        this.spList.unshift(item)
      })
    }
  },
  computed: {
    priceSum() {
      let total = 0
      if (this.waimai === 1) {
        total = 10
      } else {
        total = 0
      }

      this.spList.map(item => {
        total += parseFloat(item.kprice).toFixed(2) * item.sum
      })
      return total
    },
    heji() {
      var gongsm = 0
      this.spList.forEach(item => {
        gongsm += item.sum
      })
      return gongsm.toString()
    }
  },
  watch: {
    heji(newval, oldval) {
      bus.$emit('shangpinSum', newval)
    }
  },
  created() {
    this.getlist()
  }
}
</script>

<style lang="less" scoped>
.logingbox {
  position: fixed;
  z-index: 10001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .loging {
    position: absolute;
    left: 50%;
    margin-left: -100px;
    top: 50%;
    margin-top: -75px;
    width: 200px;
  }
}
.tableimg {
  width: 100%;
}
/deep/.el-divider {
  margin: 0 !important;
}
#MyShopping {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 12px 10px 0;
  .zffs {
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    color: #303133;
    font-size: 13.5px;
    padding: 0 7px;
    .ulli1 {
      float: left;
    }
    .ulli2 {
      float: right;
      line-height: 40px;
      .channels {
        margin: 0 10px;
      }
      .ulli2zffs {
        vertical-align: middle;
        width: 25px;
      }
    }
  }
  .dingdanzhifu1 {
    text-align: center;
    font-family: '黑体';
    font-size: 30px;
    color: black;
    font-weight: 600;
  }
  .dingdanzhifu2 {
    font-size: 13px;
    margin-top: 15px;
    margin-bottom: 24px;
    text-align: center;
  }
  .preces {
    position: relative;
    // text-align: center;
    color: white;
    text-indent: 2em;
    line-height: 40px;
    margin-top: 9px;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    background-color: #3a3a3a;
    font-size: 13px;
    .dashagua {
      top: -5px;
      left: -5px;
      font-size: 12px;
      text-indent: 0;
      position: absolute;
      min-width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      background-color: #f00019;
      border-radius: 50px;
      padding: 0 5px;
    }
    .dbf {
      text-decoration: underline;
      float: right;
      margin-right: 18px;
    }
    #priceSums {
      margin-left: 3px;
      vertical-align: bottom;
      font-size: 17px;
      font-weight: 600;
    }
  }
  .ddxqlg {
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    height: 450px;
    .cpxq {
      font-weight: 600;
      left: 0;
      width: 100%;
      height: 40px;
      border-radius: 4px;
      background-color: #f00019;
      text-align: center;
      line-height: 40px;
      color: white;
    }
    .ul {
      width: 100%;
      height: 405px;
      overflow-x: hidden;
      overflow-y: scroll;
      padding: 0 8px;
      .ulli {
        position: relative;
        margin: 8px 0;
        overflow: hidden;
        width: 100%;
        height: 80px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        .jiajian {
          position: absolute;
          text-align: center;
          line-height: 30px;
          right: 2px;
          bottom: 6px;
          width: 80px;
          height: 30px;
          font-size: 18px;
          .jiajianwz {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            margin: 0 8px;
          }
          .jj {
            cursor: pointer;
          }
        }
        .gbUlli {
          position: absolute;
          cursor: pointer;
          right: 8px;
          top: 6px;
          font-size: 20px;
          color: #909399;
          font-weight: 600;
        }
        .ulliimg {
          width: 80px;
          float: left;
        }
        .listname {
          width: 100px;
          height: 100%;
          float: left;
          .listNameTitle {
            font-family: '黑体';
            margin-top: 12px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .listNamePrice {
            margin-top: 15px;
            font-size: 13px;
            font-weight: 600;
          }
        }
      }
      &::-webkit-scrollbar {
        width: 1.8px; /*高宽分别对应横竖滚动条的尺寸*/
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #909399;
      }
    }
  }
  #xuanze {
    position: absolute;
    right: -101.5px;
    top: -1px;
    width: 100px;
    height: 100%;
    li {
      background-color: white;
    }
    .qingkong {
      cursor: pointer;
      position: absolute;
      bottom: 80px;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      border: 1px solid #dcdfe6;
      text-align: center;
      padding-top: 10px;
      font-weight: 600;
      font-size: 14px;
      color: #909399;
      .clearimg {
        width: 30px;
        margin-bottom: 8px;
      }
    }
    .jiesuan {
      cursor: pointer;
      position: absolute;
      bottom: -2px;
      padding-top: 10px;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      border: 1px solid #dcdfe6;
      text-align: center;
      .jiesuanwz {
        font-weight: 600;
      }
      .cartt {
        color: #67c23a;
        font-size: 40px;
      }
    }
    .addclass {
      border: 2px solid #f55e55 !important;
    }
    .wmzq {
      cursor: pointer;
      position: relative;
      border-radius: 5px;
      height: 80px;
      width: 80px;
      text-align: center;
      margin-bottom: 1.5px;
      border: 2px solid transparent;
      span {
        position: absolute;
        padding: 3px;
        top: -3px;
        right: -2px;
        font-size: 20px;
        color: #f55e55;
      }
      img {
        width: 40px;
        margin-top: 11px;
      }
      p {
        font-weight: 600;
      }
    }
  }
}
</style>