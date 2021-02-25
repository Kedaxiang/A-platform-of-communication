<template>
  <div class="wrapper">
    <div class="header">
      <div class="left-box">
        <div class="logo" @click="toIndex">
          <i class="el-icon-arrow-left"></i>
          返回主页
        </div>
      </div>
      <div class="right-box">
        <div class="btn">
          <i class="el-icon-question" />
          帮助
        </div>
        <div class="btn" @click="toUser" v-if="!ifLogin">登录/注册</div>
        <el-dropdown @command="handleCommand" v-else>
          <div class="user el-dropdown-link">
            <div class="avatar">
              <img :src="userInfo.headPortrait" alt="" />
            </div>
            <div class="userName">{{ userInfo.name }}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="content">
      <div class="video-box">
        <div class="title">
          <span class="chapter">{{ courseInfo.name }}</span>
        </div>
        <div class="video">
          <video :src="courseInfo.videoUrl" autoplay controls="controls" />
        </div>
      </div>
      <div class="video-menu">
        <div class="list-test">
          <div class="test-name">文件下载</div>
          <el-divider></el-divider>
          <div class="file-wrapper" v-for="item in courseInfo.resourceUrlList" :key="item">
            <div class="file">
              文件
              <el-button type="primary" @click="download(item)">下载</el-button>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import courseService from "@/api/course.js";
import userService from "@/api/user.js";

export default {
  data() {
    return {
      ifLogin: false,
      courseId: "",
      courseInfo: {},
      userInfo: {},
    };
  },
  watch: {
    ifLogin(val) {
      if (val) this.fetchUserInfo();
    },
  },
  methods: {
    toIndex() {
      this.$router.push("/index");
    },
    handleCommand(command) {
      if (command == "logout") {
        localStorage.clear();
        this.ifLogin = false;
        this.$message.success("退出登陆成功");
      } else {
        this.$router.push("/home");
      }
    },
    async fetchCourseDetail(id) {
      let res = await courseService.getCourseDetail(id);
      console.log(res);
      if (res.success) this.courseInfo = res.detail;
    },
    async fetchUserInfo() {
      let res = await userService.getUserInfo();
      if(res.success) this.userInfo = res.userInfo
      else this.$message.error(res.message)
    },
    checkToken() {
      if(!localStorage.getItem('token')) {
        this.$message.error('请先登录再进入课程详情');
        this.$router.push('/user')
        return false
      }
    },
    toUser() {
      this.$router.push("/user");
    },
    download(url) {
      console.log('下载文件');
      window.open(url)
    }
  },
  created() {
    this.ifLogin = localStorage.getItem("ifLogin");
  },
  mounted() {
    if(!this.checkToken()) return
    this.courseId = this.$route.query.courseId;
    this.fetchCourseDetail(this.courseId);
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: calc(100% - 64px);
  .header {
    width: 100%;
    height: 64px;
    background-color: rgb(63, 63, 63);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;

    .left-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .logo {
        user-select: none;
        cursor: pointer;
        width: 140px;
        margin-right: 30px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: inherit;
        background-color: rgba(255, 255, 255, 0.458823529411765);
        border: none;
        border-radius: 4px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        font-size: 12px;
        color: #ffffff;
      }

      .tabs-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .tab {
          user-select: none;
          width: 104px;
          height: 64px;
          line-height: 64px;
          text-align: center;
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.447058823529412);
        }
      }
    }

    .center-box {
      color: rgba(255, 255, 255, 0.447058823529412);
      font-size: 20px;
    }

    .right-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 180px;

      .btn {
        user-select: none;
        cursor: pointer;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.447058823529412);
      }

      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100px;
        cursor: pointer;

        .avatar {
          border-width: 0px;
          width: 32px;
          height: 32px;
          background-color: rgba(255, 255, 255, 0.458823529411765);
          border: none;
          border-radius: 15px;
          -moz-box-shadow: none;
          -webkit-box-shadow: none;
          box-shadow: none;
          font-size: 18px;
          color: #ffffff;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .userName {
          font-family: "Microsoft YaHei";
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.447058823529412);
          text-align: left;
          overflow: hidden;
          width: 60px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .content {
    position: relative;
    height: 100%;
    min-width: 1200px;
    display: flex;

    .video-box {
      width: calc(100% - 340px);
      height: 100%;
      background: #000;
      position: relative;

      .title {
        background: #f6f6f6;
        box-shadow: inset -1px 0 0 0 #ededed;
        right: 340px;
        height: 40px;
        line-height: 40px;
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 35px 0 60px;
        z-index: 2;
        width: 100%;
        box-sizing: border-box;

        .chapter {
          height: 40px;
          line-height: 40px;
          margin-right: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: inline-block;
          font-size: 13px;
          font-weight: 700;
          color: #2a2a2a;
        }

        .lessonName {
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: inline-block;
          font-size: 12px;
          color: #2a2a2a;
        }
      }

      .video {
        width: 100%;
        height: 100%;
        background: rgb(0, 0, 0);
        padding-top: 40px;

        video {
          width: 100%;
          // height: 100%;
        }
      }
    }

    .video-menu {
      width: 340px;
      background-color: #f4f4f4;

      .list-test {
        background-color: #fff;

        .test-name {
          text-align: center;
          padding-top: 30px;
          font-size: 20px;
          font-weight: 600;
        }

        .file-wrapper {
          // height: 50px;

          .file {
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>