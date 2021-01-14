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
    <el-dialog title="修改密码" :visible.sync="dialogTableVisible" style="text-align: center">
      <div class="input-wrapper">
        <div class="input-box">
          <div class="title">旧密码</div>
          <el-input placeholder="请输入当前账号密码" v-model="input1"/>
        </div>
        <div class="input-box">
          <div class="title">新密码</div>
          <el-input placeholder="请输入新密码" v-model="input1"/>
        </div>
        <div class="input-box">
          <div class="title">确认密码</div>
          <el-input placeholder="请重复新密码" v-model="input1"/>
        </div>
      </div>
      <el-button style="margin-top:20px">确认修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
    }
  }
}
</script>

<style lang="less" scoped>
  .persInfoBox {
    min-height: 270px;
    width: 100%;

    .infoLabel {
      font-size: 16px;
      color: #2A2A2A;
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
        color: #2A2A2A;
        font-weight: bold;
      }
    }

    
  }
</style>