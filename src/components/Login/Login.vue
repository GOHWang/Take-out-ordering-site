<template>
  <div>
    <div id="loginBox">
      <h1>账户登录</h1>
      <!-- 账号 -->
      <el-row>
        <el-col :span="3">
          <i class="el-icon-user ueer"></i>
        </el-col>
        <el-col :span="21">
          <el-input placeholder="手机号/账号" v-model.number.trim="username">
          </el-input>
        </el-col>
      </el-row>
      <!-- 密码 -->
      <el-row style="margin-top:30px">
        <el-col :span="3">
          <i class="el-icon-lock ueer"></i>
        </el-col>
        <el-col :span="21">
          <el-input placeholder="密码" v-model.trim="password" show-password @keyup.enter.native="login"></el-input>
        </el-col>
      </el-row>
      <!-- 忘记密码 -->
      <p style="text-align:right">
        <el-link type="info" class="xinxi">忘记密码？
        </el-link>
      </p>
      <!-- 登录 -->
      <el-button type="danger" class="mt-2 login" @click="login">登录</el-button>
      <p style="text-align:right">
        <el-link type="info" class="xinxi" @click="zhuce">立即注册
        </el-link>
      </p>
      <p class="dsfdl">第三方登录</p>
      <hr class="hr-style-seven mt-3">
      <p>
        <img src="@/assets/images/qq.png" class="qqwx mr-2">
        <img src="@/assets/images/weixin.png" class="qqwx ml-2">
      </p>
    </div>

    <!-- 同意协议 -->
    <el-dialog title="用户协议与隐私政策" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :fullscreen="true" :modal="false" center>
      <p style="text-align:center">请你审慎阅读、充分理解<span class="userXieYi">&nbsp;用户协议&nbsp;</span>和<span class="userXieYi">&nbsp;隐私政策&nbsp;</span>各条款，包括但不限于:为了向你提供即时通讯、内容分享等服务，我们需要收集你的设备信息、操作日志等个人信息。</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">不同意</el-button>
        <el-button type="primary" @click="go">同 意</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      dialogVisible: false,
      username: '',
      password: '',
      users: [
        {
          name: 13346662423,
          pass: '123456'
        },
        {
          name: 18237391455,
          pass: '12345'
        }
      ]
    }
  },
  created() {
    // 接收注册组件传递过来的值
    if (this.$route.query.Theme === undefined) {
      return false
    } else {
      this.users.push(this.$route.query.Theme)
    }
  },
  // 方法节点
  methods: {
    // 确认关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 跳转注册
    zhucecg() {
      this.users.push(this.$route.query.Theme)
    },
    zhuce() {
      this.$router.push('/login/register')
    },
    go() {
      localStorage.setItem('token', this.username)
      this.$router.push('/home')
    },
    // 点击登录
    login() {
      if (this.username == '' || this.password == '') {
        this.$message.error('账号或密码不能为空，请重新输入')
        return
      }
      const flag = this.users.some(item => {
        if (this.username === item.name && this.password === item.pass) {
          this.dialogVisible = true
          //登录成功
          return true
        }
      })
      if (flag === false) {
        this.$message({
          showClose: true,
          message: '用户名或密码错误，请重新输入！',
          type: 'error'
        })
        localStorage.removeItem('token')
        return
      }
    }
  }
}
</script>

<style lang="less" scoped>
.userXieYi {
  cursor: pointer;
  color: #2d77e5;
  font-size: 16px;
}
.userXieYi:hover {
  text-decoration: underline;
}
#loginBox {
  position: fixed;
  width: 450px;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.45);
  box-shadow: 0px 3px 6px #333333;
  border-radius: 5px;
  left: 50%;
  margin-left: calc(-450px / 2);
  top: 50%;
  margin-top: calc(-500px / 2);
  text-align: center;
  padding: 25px 40px;
  h1 {
    color: white;
    margin-bottom: 25px;
  }
  .ueer {
    width: 100%;
    font-size: 28px;
    vertical-align: middle;
    height: 50px;
    line-height: 50px;
    border-radius: 5px 0 0 5px;
    color: #b4b4b4;
    background-color: #eeeeee;
  }
  .xinxi {
    color: white;
    margin-top: 20px;
  }
  .login {
    width: 100%;
    height: 45px;
    font-size: 17px;
    font-weight: bold;
  }
  .dsfdl {
    color: #dc3545;
  }
  .hr-style-seven {
    overflow: visible;
    height: 30px;
    border-style: solid;
    border-color: white;
    border-width: 1px 0 0 0;
    border-radius: 20px;
    &::before {
      display: block;
      content: '';
      height: 30px;
      margin-top: -31px;
      border-style: solid;
      border-color: white;
      border-width: 0 0 1px 0;
      border-radius: 20px;
    }
  }
  .qqwx {
    width: 50px;
    cursor: pointer;
  }
  // .hr-style-seven::before
}
/deep/.el-input__inner {
  border-radius: 0 5px 5px 0;
  height: 50px;
  font-size: 16.5px;
}
</style>