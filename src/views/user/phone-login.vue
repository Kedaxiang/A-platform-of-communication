<template>
  <div class="account-login_box form-box">
    <el-form
      :rules="rules"
      :model="loginForm"
      ref="loginForm"
      @submit.native.prevent="submitForm"
    >
      <el-form-item prop="userName">
        <el-input
          placeholder="手机号"
          v-model="loginForm.userName"
          prefix-icon="el-icon-mobile-phone"
        />
      </el-form-item>
      <el-form-item prop="verification">
        <div style="display: flex; justify-content: space-between;">
          <el-input 
            placeholder="验证码" 
            prefix-icon="el-icon-lock"
            v-model="loginForm.verification" 
            class="input-with-select" 
            style="width: 200px"
          />
          <el-button type="primary" @click="getCode" :disabled="!timeout">{{btnText}}</el-button>
        </div>
        
      </el-form-item>
      <div class="btn-wrap">
        <el-checkbox v-model="loginForm.checked">记住我</el-checkbox>
      </div>
      <el-form-item>
        <el-button type="primary" class="login-button" native-type="submit" style="width: 100%;">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifCur: true,
      rules: {
        userName: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      loginForm: {
        userName: "",
        verification: "",
        checked: Boolean
      },
      timeout: true,
      btnText: '获取验证码'
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async valid => {
        // element-ui 提供的表单预验证
        if (valid) {
          this.$message.success("登陆成功");
        // this.$router.push("/home/preview");
        }
      });
    },
    getCode() {
      let time = 60;
      this.timeout = false;
      let countDown = setInterval(() => {
        time--;
        this.btnText = `${time}秒后获取`
        if (time < 0) {
          clearInterval(countDown);
          this.time = 60;
          this.timeout = true;
          this.btnText = '获取验证码'
        }
      }, 1000);
    }
  }
}
</script>

<style lang="less" scoped>
.form-box {
  width: 340px;
  margin: 20px auto;

  .btn-wrap {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .btn {
      font-weight: 400;
      font-style: normal;
      color: #1890FF;
      font-size: 14px;
    }
  }
}
</style>