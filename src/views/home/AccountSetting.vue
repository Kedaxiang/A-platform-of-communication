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
          <el-input
            placeholder="请输入内容"
            v-model="userInfo.name"
            style="width: 250px"
          >
            <template slot="prepend">昵称</template>
          </el-input>
          <el-button>修改</el-button>
        </div>
      </div>
    </div>
    <div class="persInfoBox">
      <span class="infoLabel">
        联系方式
      </span>
      <div class="persInfoList-box">
        <div class="persInfoList-li basic">
          <el-input
            placeholder="请输入新手机号"
            v-model="userInfo.phoneNumber"
            :disabled="!ifChangePhoneNumber"
            style="width: 300px;margin-bottom: 30px;"
          >
            <template slot="prepend" width="150">手机号</template>
          </el-input>
          <el-button
            v-if="!ifChangePhoneNumber"
            @click="ifChangePhoneNumber = true"
            >修改</el-button
          >
          <el-button v-else @click="changePhoneNumber">确认</el-button>
        </div>
        <div class="persInfoList-li basic">
          <el-input
            placeholder="请输入内容"
            v-model="userInfo.email"
            :disabled="true"
            style="width: 300px"
          >
            <template slot="prepend" width="150">邮箱</template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/api/user.js";

export default {
  data() {
    return {
      userInfo: {
        email: "",
        phoneNumber: "",
        headPortrait: "",
        name: "",
      },
      ifChangeUsername: false,
      ifChangePhoneNumber: false,
    };
  },

  methods: {
    async fetchUserInfo() {
      let res = await userService.getUserInfo();
      console.log(res);
      if (res.success) this.userInfo = res.userInfo;
    },
    changePhoneNumber() {
      // this.ifChangePhoneNumber = false;
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { data: res } = await deleteCourse(id);
          if (res.success) this.afterSuccessHandle(res.message);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },

  mounted() {
    this.fetchUserInfo();
  },
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
    width: 430px;
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

<style lang="less">
.persInfoList-box {
  .el-input-group__prepend {
    width: 85px;
  }
}
</style>
