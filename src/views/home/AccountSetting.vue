<template>
  <div class="wrapper">
    <div class="persInfoBox">
      <span class="infoLabel"> 基本信息 </span>
      <div class="persInfoList">
        <div class="avatar">
          <div class="avatar-pic">
            <img
              :src="userInfo.headPortrait ? userInfo.headPortrait : defaultUrl"
              alt=""
            />
          </div>
          <el-button @click="dialogFormVisible = true">编辑头像</el-button>
        </div>
        <div class="persInfoList-li basic">
          <el-input
            placeholder="请输入内容"
            v-model="userInfo.name"
            :disabled="!ifChangeUsername"
            style="width: 250px"
          >
            <template slot="prepend">昵称</template>
          </el-input>
          <el-button v-if="!ifChangeUsername" @click="ifChangeUsername = true"
            >修改</el-button
          >
          <el-button v-else @click="changeUsername">确认</el-button>
        </div>
      </div>
    </div>
    <div class="persInfoBox">
      <span class="infoLabel"> 联系方式 </span>
      <div class="persInfoList-box">
        <div class="persInfoList-li basic">
          <el-input
            placeholder="请输入新手机号"
            v-model="userInfo.phoneNumber"
            :disabled="!ifChangePhoneNumber"
            style="width: 300px; margin-bottom: 30px"
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
    <el-dialog
      title="头像编辑"
      :visible.sync="dialogFormVisible"
      style="text-align: center"
    >
      <div class="change-content clearFix">
        <!-- <div class="img-preview-wrap">
          <div class="pre-container"></div>
        </div> -->
        <el-upload
          class="avatar-uploader img-preview-wrap"
          :action="`${axios.defaults.baseURL}/api/upload/singlePhotoUpload`"
          :show-file-list="false"
          :on-progress="uploadProgress"
          :on-success="handleAvatarSuccess"
        >
          <el-progress
            v-if="isUpload"
            type="circle"
            :percentage="progressPercentage"
            :width="160"
            style="display: block"
          ></el-progress>
          <img v-else-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="border-line"></div>
        <div class="img-current-wrap">
          <div class="cur-container" ref="curImg"></div>
          <div class="cur-info">当前头像</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
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

      dialogFormVisible: false,
      isUpload: false,
      progressPercentage: 0,
      imageUrl: "",
      defaultUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  watch: {
    dialogFormVisible(val) {
      if (val) {
        this.imageUrl = "";
        let imgUrl = this.userInfo.headPortrait
          ? this.userInfo.headPortrait
          : this.defaultUrl;
        this.$nextTick(() => {
          this.$refs.curImg.style.backgroundImage = `url(${imgUrl})`;
        });
      }
    },
  },
  methods: {
    async fetchUserInfo() {
      let res = await userService.getUserInfo();
      if (res.success) this.userInfo = res.userInfo;
    },
    changePhoneNumber() {
      this.$confirm("此操作将修改您的默认手机号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await userService.changePhoneNumber(this.userInfo.phoneNumber);
          // console.log(res);
          if (res.success) {
            this.afterSuccessHandle(res.message);
            this.ifChangePhoneNumber = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
          this.ifChangePhoneNumber = false;
        });
    },
    changeUsername() {
      if (!this.userInfo.name) {
        this.$message.error("请输入您的用户名");
        return;
      }
      this.$confirm("此操作将修改您的用户名, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await userService.changeUsername(this.userInfo.name);
          // console.log(res);
          if (res.success) {
            this.afterSuccessHandle(res.message);
            this.ifChangeUsername = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
          this.ifChangeUsername = false;
        });
    },
    async afterSuccessHandle(msg) {
      let res = await userService.getUserInfo();
      if (res.success) {
        this.userInfo = res.userInfo;
        this.$message.success(msg);
      }
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = res.imageUrl;
      this.isUpload = false;
    },
    uploadProgress(event, file, fileList) {
      this.isUpload = true;
      this.progressPercentage = +file.percentage.toFixed(0);
    },
    handleConfirm() {
      if(!this.imageUrl) {
        this.$message.error('请上传图片')
        return
      }
      this.$confirm("此操作将更新头像, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await userService.changeAvatar(this.imageUrl);
          this.dialogFormVisible = false;
          if (res.success) {
            this.afterSuccessHandle(res.message);
            console.log(this.$store);
            this.$store.commit('changeAvatar')
          }
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
        border-radius: 50%;
        overflow: hidden;
        background-color: #ccc;
        margin-bottom: 10px;

        img {
          width: 100%;
          height: 100%;
        }
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
.change-content {
  padding: 80px 20px 56px;
  display: inline-block;

  .img-preview-wrap {
    float: left;
    position: relative;
    margin-right: 40px;
    .pre-container {
      width: 180px;
      height: 180px;
      background-color: #000;
      border-radius: 4px;
      border: 1px solid #e5e9ef;
    }
  }

  .border-line {
    height: 182px;
    width: 1px;
    background: #e5e9ef;
    float: left;
  }

  .img-current-wrap {
    margin-left: 40px;
    margin-top: 30px;
    float: left;

    .cur-container {
      width: 96px;
      height: 96px;
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #e6eaf0;
      background-size: cover;
    }

    .cur-info {
      margin-top: 20px;
      font-size: 12px;
      color: #99a2aa;
    }
  }
}
.clearFix {
  &::before {
    content: " ";
    display: table;
  }

  &::after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>

<style lang="less">
.persInfoList-box {
  .el-input-group__prepend {
    width: 85px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
