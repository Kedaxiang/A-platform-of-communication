<template>
  <div class="account-login_box form-box">
    <el-form
      :rules="rules"
      :model="loginForm"
      ref="loginForm"
      @submit.native.prevent="submitForm"
    >
      <!-- 邮箱 -->
      <el-form-item prop="userEmail">
        <el-input
          placeholder="请输入邮箱"
          v-model="loginForm.userEmail"
          prefix-icon="el-icon-message"
        ></el-input>
      </el-form-item>
      <!-- 设置密码 -->
      <el-form-item prop="userPwd">
        <el-input
          placeholder="6 - 16位密码，区分大小写"
          v-model="loginForm.userPwd"
          type="password"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <!-- 再次输入密码 -->
      <el-form-item prop="userPwdComfirm">
        <el-input
          placeholder="请再次输入密码"
          v-model="loginForm.userPwdComfirm"
          type="password"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <!-- 设置手机号 -->
      <el-form-item prop="userPhoneNumber">
        <el-input
          placeholder="请输入11位手机号"
          v-model="loginForm.userPhoneNumber">
          <template slot="prepend">+86</template>
        </el-input>
      </el-form-item>
      <!-- 手机验证码输入 -->
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
      <!-- 注册按钮 -->
      <el-form-item>
        <el-button type="primary" class="login-button" native-type="submit" style="width: 100%;">
          注册
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
        userEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ],
        userPwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        userPwdComfirm: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ],
        userPhoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      loginForm: {
        userName: "",
        userPwd: "",
        userPwdComfirm: "",
        userPhoneNumber: "",
        verification: ""
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