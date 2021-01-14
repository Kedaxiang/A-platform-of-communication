<template>
  <div class="wrapper">
    <div class="persInfoBox">
      <span class="infoLabel">
        基本信息
      </span>
      <div class="persInfoList">
        <div class="avatar">
          <div class="avatar-pic"></div>
          <el-button>编辑头像</el-button>
        </div>
        <div class="persInfoList-li  basic">
          <el-input placeholder="请输入内容" v-model="input1" style="width: 250px">
            <template slot="prepend">昵称</template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="persInfoBox">
      <span class="infoLabel">
        联系方式
      </span>
      <div class="persInfoList-box">
        <div class="persInfoList-li basic">
          <el-input placeholder="请输入内容" v-model="input1" style="width: 300px;margin-bottom: 30px;">
            <template slot="prepend">手机号</template>
          </el-input>
          <el-button>修改</el-button>
        </div>
        <div class="persInfoList-li basic">
          <el-input placeholder="请输入内容" v-model="input1" style="width: 300px">
            <template slot="prepend">邮箱</template>
          </el-input>
          <el-button>修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
      margin-top: 30px;
      display: flex;
      // justify-content: space-around;
      padding: 0 50px;

      .avatar {
        width: 130px;
        text-align: center;
        margin-right: 50px;

        .avatar-pic {
          width: 130px;
          height: 130px;
          background-color: #ccc;
          margin-bottom: 10px;
        }
      }
    }

    .basic {
      display: flex;
      width: 450px;
      height: 40px;
      justify-content: space-between;
    }

    .persInfoList-box {
       padding: 0 50px;
       margin-top: 30px;

       .basic {
         margin-bottom: 20px;
       }
    }
  }
</style>