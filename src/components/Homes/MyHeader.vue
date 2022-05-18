<template>
  <div>
    <el-row type="flex" class="row-bg" :gutter="20">
      <el-col :span="2">
        <div class="tx" @click="gohome"></div>
      </el-col>
      <el-col :span="10">
        <div class="xxka" :class="{'hight':hight==1}">
          <router-link to="/home">
            <li @click="nav(1)" :class="{'addcss':addindex==1}">
              <i class="el-icon-bangzhu xuanxiang"></i>
              <span class="navtext" v-text="textd[0]"></span>
            </li>
          </router-link>
          <router-link to="/home/mymall">
            <li @click="nav(2)" :class="{'addcss':addindex==2}">
              <i class="el-icon-goods xuanxiang"></i>
              <span class="navtext" v-text="textd[1]"></span>
            </li>
          </router-link>
          <router-link to="/home/myorder">
            <li @click="nav(3)" :class="{'addcss':addindex==3}">
              <i class="el-icon-tickets xuanxiang"></i>
              <span class="navtext" v-text="textd[2]"></span>
            </li>
          </router-link>
          <router-link to="/home/mycenter">
            <li @click="nav(4)" :class="{'addcss':addindex==4}">
              <i class="el-icon-user xuanxiang"></i>
              <span class="navtext" v-text="textd[3]"></span>
            </li>
          </router-link>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="xxkaa" @click="coffee">
          <div class="kzcenter">
            <img src="@/assets/images/mianfeiHkf.png" width="50px">
            <span v-text="textd[4]" style="font-weight: 600;"></span>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="xxkaa" @click="signIn">
          <div class="kzcenter">
            <img src="@/assets/images/qiandao.png" width="40px">&nbsp;
            <span v-text="textd[5]" style="font-weight: 600;"></span>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="xxkaa" @click="yuyue">
          <div class="kzcenter">
            <img src="@/assets/images/yuyue.png" width="40px">&nbsp;
            <span v-text="textd[6]" style="font-weight: 600;"></span>
          </div>
        </div>
      </el-col>
    </el-row>

    <MyFreeCoffee :drawer="pddrawer" @changeDrawer="changeDrawer"></MyFreeCoffee>
  </div>
</template>

<script>
import MyFreeCoffee from '@/components/Homes/MyMain/MyFreeCoffee/MyFreeCoffee.vue'
import bus from '@/eventBus.js'
export default {
  name: 'MyHeader',
  data() {
    return {
      pddrawer: false,
      addindex: 1,
      hight: 1,
      texts: ['首页', '商城', '订单', '我的', '免费H咖啡', '签到有礼', '预约订单'],
      textd: [],
      bools: false,
      flag: true
    }
  },
  created() {
    this.scrollToTop()
    bus.$on('backhome', val => {
      this.addindex = val
    })
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
  },
  // 方法节点
  methods: {
    // 预约
    yuyue() {
      this.$message({
        message: '暂未开通此服务',
        offset: 100
      })
    },
    // 签到
    signIn() {
      if (this.flag) {
        this.$store.commit('SINGIN', 20)
        this.$notify.success({
          title: '签到成功',
          message: '积分+20',
          showClose: false,
          offset: 100
        })
        this.flag = false
      } else {
        this.$notify.info({
          title: '签到失败',
          message: '今天已经签过到了哦！明天再来吧',
          offset: 100
        })
      }
    },
    changeDrawer(v) {
      this.pddrawer = v
    },
    coffee() {
      this.pddrawer = true
    },
    scrollToTop() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 150) {
        this.textd = []
        this.bools = true
      } else {
        this.textd = [...this.texts]
        this.bools = false
      }
      this.$emit('boolsChange', this.bools)
    },
    nav(val) {
      this.addindex = val
    },
    gohome() {
      this.$router.push('/home').catch(err => {
        this.addindex = 1
        this.hight = 1
        return
      })
      this.addindex = 1
    }
  },
  components: {
    MyFreeCoffee
  }
}
</script>

<style lang="less" scoped>
.tx {
  cursor: pointer;
  width: 70px;
  height: 70px;
  background: url('@/assets/images/logo3.png') no-repeat;
  background-size: cover;
  border-radius: 35px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.xxkaa {
  width: 100%;
  height: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .kzcenter {
    text-align: center;
    line-height: 65px;
    font-size: 14.5px;
    color: #303133;
  }
}
.hight {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.xxka {
  width: 100%;
  height: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  .addcss {
    color: #f00019;
  }
  li {
    float: left;
    width: 25%;
    height: 100%;
    text-align: center;
    color: #303133;
    font-weight: 600;
    display: flex;
    align-content: center;
    flex-direction: column;
    justify-content: center;

    .xuanxiang {
      font-size: 30px;
      cursor: pointer;
    }
    .navtext {
      font-size: 13px;
      cursor: pointer;
    }
  }
}
.row-bg {
  height: 90px !important;
  padding: 10px 0;
}
</style>