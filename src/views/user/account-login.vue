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
          placeholder="用户名"
          v-model="loginForm.userName"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          placeholder="密码"
          v-model="loginForm.userPwd"
          type="password"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <div class="btn-wrap">
        <el-checkbox v-model="loginForm.checked">记住我</el-checkbox>
        <div class="btn" @click="showDialog">忘记密码</div>
      </div>
      <el-form-item>
        <el-button type="primary" class="login-button" native-type="submit" style="width: 100%;">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="忘记密码" :visible.sync="dialogTableVisible" style="text-align: center">
      <div class="input-wrapper">
        <div class="input-box">
          <div class="title">手机号</div>
          <el-input placeholder="请输入手机号" v-model="input1"/>
        </div>
        <div class="input-box">
          <div class="title">验证码</div>
          <div class="code">
            <el-input placeholder="请输入验证码 " v-model="input1"/>
            <el-button>获取验证码</el-button>
          </div>
          
        </div>
        <div class="input-box">
          <div class="title">新密码</div>
          <el-input placeholder="请输入新密码" v-model="input1"/>
        </div>
      </div>
      <el-button style="margin-top:20px" @click="changePwd">确认修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifCur: true,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      loginForm: {
        userName: "1111",
        userPwd: "1111",
        checked: Boolean
      },
      isChangeLogin: false,
      dialogTableVisible: false
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async valid => {
        // element-ui 提供的表单预验证
        if (valid) {
          console.log(this.loginForm);
          if(this.loginForm.userName == '1111' && this.loginForm.userPwd == '1111') localStorage.setItem("ifLogin", true);
          this.$message.success("登陆成功");
          this.$router.push("/index");
        }
      });
    },
    showDialog() {
      this.dialogTableVisible = true;
    },
    changePwd() {
      this.dialogTableVisible = false;
      this.$message.success('修改密码成功')
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
      cursor: pointer;
      font-weight: 400;
      font-style: normal;
      color: #1890FF;
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
        color: #2A2A2A;
        font-weight: bold;
      }
    }

    .code {
      display: flex;
    }
  }
}
</style>