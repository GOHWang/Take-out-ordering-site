<template>
  <div id="Registerbox">
    <div class="box">
      <h1>用户注册</h1>
      <el-divider></el-divider>
      <el-form :model="ruleForm" status-icon :rules="rules" :label-position="'top'" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="name" :required="true">
          <el-input v-model.number="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" :required="true">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :required="true" @keyup.enter.native="submitForm('ruleForm')">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="mr-4">注册</el-button>
          <el-button @click="resetForm('ruleForm')" class="ml-4">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value.toString().length < 11) {
            callback(new Error('手机号必须满足11位'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        name: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        name: [{ validator: checkAge, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 注册成功，跳转登录
          this.$confirm('注册成功，是否跳转登录页面？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            lockScroll: false
          })
            .then(() => {
              this.$router.push({
                path: '/login',
                query: { Theme: this.ruleForm }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消登录'
              })
            })
        } else {
          this.$message({
            message: '格式有误，请检查后重新注册',
            type: 'warning'
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>


<style lang="less" scoped>
/deep/.el-divider--horizontal {
  margin: 15px 0;
}
#Registerbox {
  position: fixed;
  width: 450px;
  height: 530px;
  left: 50%;
  margin-left: calc(-450px / 2);
  top: 50%;
  margin-top: calc(-530px / 2);
  background-color: rgba(255, 255, 255, 0.45);
  padding: 10px;
  .box {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.959);
    text-align: center;
    padding: 20px;
    h1 {
      color: #d9534f;
      font-weight: inherit;
    }
  }
}
</style>