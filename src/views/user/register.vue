<template>
  <div class="account-login_box form-box">
    <el-form
      :rules="rules"
      :model="userRegisterVO"
      ref="loginForm"
      @submit.native.prevent="submitForm"
    >
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input
          placeholder="请输入邮箱"
          v-model="userRegisterVO.email"
          prefix-icon="el-icon-message"
        ></el-input>
      </el-form-item>
      <!-- 设置密码 -->
      <el-form-item prop="password">
        <el-input
          placeholder="6 - 16位密码，区分大小写"
          v-model="userRegisterVO.password"
          type="password"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <!-- 再次输入密码 -->
      <el-form-item prop="userPwdComfirm">
        <el-input
          placeholder="请再次输入密码"
          v-model="userRegisterVO.userPwdComfirm"
          type="password"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <!-- 设置手机号 -->
      <el-form-item prop="phoneNumber">
        <el-input
          placeholder="请输入11位手机号"
          v-model="userRegisterVO.phoneNumber"
        >
          <template slot="prepend">+86</template>
        </el-input>
      </el-form-item>
      <!-- 手机验证码输入 -->
      <el-form-item prop="verifyCode">
        <div style="display: flex; justify-content: space-between;">
          <el-input
            placeholder="验证码"
            prefix-icon="el-icon-lock"
            v-model="userRegisterVO.verifyCode"
            class="input-with-select"
            style="width: 200px"
          />
          <el-button type="primary" @click="getCode" :disabled="!timeout">{{
            btnText
          }}</el-button>
        </div>
      </el-form-item>
      <!-- 注册按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          class="login-button"
          native-type="submit"
          style="width: 100%;"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userService from "@/api/user.js";

export default {
  data() {
    return {
      ifCur: true,
      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userPwdComfirm: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      userRegisterVO: {
        email: "709327956@qq.com",
        password: "123456",
        userPwdComfirm: "",
        phoneNumber: "19927456609",
        verifyCode: "3521",
      },
      timeout: true,
      btnText: "获取验证码",
    };
  },
  methods: {
    submitForm() {
      if (!this.checkPwd()) return;
      this.$refs.loginForm.validate(async (valid) => {
        // element-ui 提供的表单预验证
        if (valid) {
          let res = await userService.register(this.userRegisterVO);
          console.log(res);
          if (res.success) {
            this.$message.success("注册成功,请登录");
            this.$parent.curIndex = 0;
          } else {
            this.$message.error(res.message);
          }
        }
      });
    },
    async getCode() {
      let res = await userService.getRegVerifyCode({
        phoneNumber: this.userRegisterVO.phoneNumber,
      });
      let time = 60;
      this.timeout = false;
      let countDown = setInterval(() => {
        time--;
        this.btnText = `${time}秒后获取`;
        if (time < 0) {
          clearInterval(countDown);
          this.time = 60;
          this.timeout = true;
          this.btnText = "获取验证码";
        }
      }, 1000);
    },
    checkPwd() {
      let pwd = this.userRegisterVO.password;
      let confirmPwd = this.userRegisterVO.userPwdComfirm;
      if (pwd != confirmPwd) {
        this.$message.error("两次密码不一致");
        this.pwdConfirm = "";
        return false;
      }
      return true;
    },
  },
};
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
      color: #1890ff;
      font-size: 14px;
    }
  }
}
</style>
