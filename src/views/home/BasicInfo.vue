<template>
  <div class="wrapper">
    <div class="persInfoBox">
      <span class="infoLabel">
        基本信息
      </span>
      <div class="persInfoList">
        设置复杂密码更能保护你的账号安全

        <el-button @click="dialogTableVisible = true">修改</el-button>
      </div>
      <el-divider></el-divider>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogTableVisible"
      style="text-align: center"
    >
      <div class="input-wrapper">
        <div class="input-box">
          <div class="title">旧密码</div>
          <el-input placeholder="请输入当前账号密码" v-model="oldPwd" type="password"/>
        </div>
        <div class="input-box">
          <div class="title">新密码</div>
          <el-input placeholder="请输入新密码" v-model="newPwd" type="password"/>
        </div>
        <div class="input-box">
          <div class="title">确认密码</div>
          <el-input placeholder="请重复新密码" v-model="checkPwd" type="password"/>
        </div>
      </div>
      <el-button style="margin-top:20px" @click="changePwd">确认修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
import userService from '@/api/user.js'

export default {
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      checkPwd: "",
      dialogTableVisible: false,
    };
  },
  methods: {
    async changePwd() {
      let { newPwd, checkPwd } = this;
      if(newPwd != checkPwd) {
        this.$message.error('两次输入密码不一致')
        return;
      }
      let res = await userService.changePwd(newPwd);
      console.log(res);
      if(res.success) {
        this.$message.success('修改成功,请重新登录')
        this.$router.push('/user')
      } else {
        this.$message.error(res.message)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.persInfoBox {
  min-height: 270px;
  width: 100%;

  .infoLabel {
    font-size: 16px;
    color: #2a2a2a;
    line-height: 26px;
    font-weight: bold;
    margin: 28px 0 0 30px;
    display: inline-block;
  }

  .persInfoList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 40px 0;
    font-size: 16px;
    color: #777777;
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
}
</style>
