<template>
  <div class="account-login_box form-box">
    <el-form
      :rules="rules"
      :model="loginForm"
      ref="loginForm"
      @submit.native.prevent="submitForm"
    >
      <el-form-item prop="email">
        <el-input
          placeholder="用户名"
          v-model="loginForm.email"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="密码"
          v-model="loginForm.password"
          type="password"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <div class="btn-wrap">
        <el-checkbox v-model="checked">记住我</el-checkbox>
        <div class="btn" @click="showDialog">忘记密码</div>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          class="login-button"
          native-type="submit"
          style="width: 100%;"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="忘记密码"
      :visible.sync="dialogTableVisible"
      style="text-align: center"
    >
      <div class="input-wrapper">
        <div class="input-box">
          <div class="title">手机号</div>
          <el-input
            placeholder="请输入手机号"
            v-model="updataPwdForm.phoneNum"
          />
        </div>
        <div class="input-box">
          <div class="title">验证码</div>
          <div class="code">
            <el-input
              placeholder="请输入验证码 "
              v-model="updataPwdForm.verifyCode"
            />
            <el-button>获取验证码</el-button>
          </div>
        </div>
        <div class="input-box">
          <div class="title">新密码</div>
          <el-input placeholder="请输入新密码" v-model="updataPwdForm.newPwd" />
        </div>
      </div>
      <el-button style="margin-top:20px" @click="changePwd">确认修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
import userService from "@/api/user.js";

export default {
  data() {
    return {
      ifCur: true,
      rules: {
        email: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginForm: {
        email: "826107601@qq.com",
        password: "123456",
        // checked: Boolean,
      },
      checked: Boolean,
      updataPwdForm: {
        phoneNum: "",
        newPwd: "",
        verifyCode: "",
      },
      isChangeLogin: false,
      dialogTableVisible: false,
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        // element-ui 提供的表单预验证
        if (valid) {
          console.log(this.loginForm);
          let res = await userService.pwdLogin(this.loginForm);
          console.log(res);
          if (res.success) {
            localStorage.setItem("ifLogin", true);
            localStorage.setItem("token", res.userLoginVO.token);
            this.$message.success("登陆成功");
            this.$router.push("/index");
          }
        }
      });
    },
    showDialog() {
      this.dialogTableVisible = true;
    },
    changePwd() {
      this.dialogTableVisible = false;
      this.$message.success("修改密码成功");
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
      cursor: pointer;
      font-weight: 400;
      font-style: normal;
      color: #1890ff;
      font-size: 14px;
    }
  }

  .input-wrapper {
    width: 318px;
    margin: auto;

    .input-box {
      text-align: left;

      .title {
        margin: 20px 0 15px;
        font-size: 14px;
        color: #2a2a2a;
        font-weight: bold;
      }
    }

    .code {
      display: flex;
    }
  }
}
</style>
