<template>
  <div id="MyCenter">
    <div id="Center">
      <div class="userBg">
        <!-- 头像 -->
        <el-avatar :size="50" :src="require('@/assets/images/touxiang.png')"></el-avatar>
        <!-- 订单数量积分 -->
        <div id="dingBox">
          <div class="dingBoxleft">
            <h3 class="mt-4 sum1Lenghth" @click="goDingdan">
              {{ sum1Lenght }}
            </h3>
            <p class="dingBoxleftNr2">
              订单
            </p>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="dingBoxRight">
            <h3 class="mt-4">
              {{ jifen }}
            </h3>
            <p class="dingBoxleftNr3">
              积分
            </p>
          </div>
        </div>
      </div>
      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名"><span contenteditable="true">未设置-</span></el-descriptions-item>
        <el-descriptions-item label="手机号">{{ shoujihao }}</el-descriptions-item>
        <el-descriptions-item label="出生日期"><span contenteditable="true">未设置-</span></el-descriptions-item>
        <el-descriptions-item label="备注"><span contenteditable="true">-</span></el-descriptions-item>
        <el-descriptions-item label="我的地址"><span contenteditable="true">-</span></el-descriptions-item>
      </el-descriptions>
      <el-row id="tuichu">
        <el-button type="danger" @click="tuichuLogin">退出登录</el-button>
      </el-row>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import bus from '@/eventBus.js'
export default {
  name: 'MyCenter',
  data() {
    return {}
  },
  methods: {
    tuichuLogin() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    goDingdan() {
      this.$router.push('/home/myorder')
      bus.$emit('backhome', 3)
    }
  },
  created() {},
  computed: {
    ...mapState(['shoujihao', 'sum1Lenght', 'jifen'])
  }
}
</script>

<style lang="less" scoped>
#Center {
  margin: 50px auto 0;
  width: 60vw;
  background-color: white;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
  // 退出登录
  #tuichu {
    margin-top: 30px;
    text-align: center;
  }
  // 用户信息
  .el-descriptions {
    margin-top: 50px;
  }
  .userBg {
    position: relative;
    width: 100%;
    height: 150px;
    background: url('@/assets/images/userBg.jpeg') no-repeat center center;
    background-size: cover;
    #dingBox {
      position: absolute;
      background: url('@/assets/images/userdingd.png') no-repeat left top;
      background-size: 50px;
      border-radius: 8px;
      border: 1px solid #dcdfe6;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      width: 300px;
      height: 100px;
      background-color: white;
      left: 50%;
      transform: translateX(-50%);
      bottom: -35px;
      display: flex;
      align-items: center;
      .dingBoxleft {
        text-align: center;
        height: 100%;
        flex: 1;
        .sum1Lenghth {
          display: inline-block;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }

        .dingBoxleftNr2 {
          margin-top: 10px;
          font-size: 13px;
        }
      }
      .el-divider {
        height: 50%;
        background-color: #606266;
      }
      .dingBoxRight {
        text-align: center;
        flex: 1;
        // background: red;
        height: 100%;
        .dingBoxleftNr3 {
          margin-top: 10px;
          font-size: 13px;
        }
      }
    }
    .el-avatar {
      position: absolute;
      bottom: 15px;
      left: 25px;
      border: 2px solid #00000053;
    }
  }
}
</style>