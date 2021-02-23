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
          <i class="el-icon-question"/>
          帮助
        </div>
        <div class="btn"  @click="toUser" v-if="!ifLogin">
          登录/注册
        </div>
        <el-dropdown @command="handleCommand" v-else>
          <div class="user el-dropdown-link">
            <div class="avatar"></div>
            <div class="userName">可达箱箱箱箱箱箱</div>
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
          <span class="chapter">中医药文化</span>
        </div>
        <div class="video">
          <video 
            src="https://wsvideo.zhihuishu.com/zhs/createcourse/course_second/202006/ac32ad712f35498dbd5b48da14a17b71_512.mp4"
            autoplay
            controls="controls"/>
        </div>
      </div>
      <div class="video-menu">
        <div class="list-test">
          <div class="test-name">文件下载</div>
          <el-divider></el-divider>
          <div class="file-wrapper" v-for="item in 6" :key="item">
            <div class="file">
              文件：{{item}} 
              <el-button type="primary">下载</el-button>
            </div>
             <el-divider></el-divider>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifLogin: false,
    }
  },
  methods: {
    toIndex() {
      this.$router.push('/index')
    },
    handleCommand(command) {
      if(command == 'logout') {
        localStorage.clear();
        this.ifLogin = false;
      } else {
        this.$router.push('/home')
      }
    },
  },
  created() {
    this.ifLogin = localStorage.getItem("ifLogin")
  }
}
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
        color: #FFFFFF;
      }

      .tabs-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .tab {
          user-select:none;
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
        user-select:none;
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
          color: #FFFFFF;
        }

        .userName {
          font-family: 'Microsoft YaHei';
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
          font-weight: 700 ;
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
          height: 100%;
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