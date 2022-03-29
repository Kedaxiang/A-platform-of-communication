<template>
  <div class="wrapper">
    <Header :ifIndex="false" />
    <div class="content">
      <div class="video-box">
        <div class="title">
          <span class="chapter">{{ courseInfo.name }}</span>
        </div>
        <div class="video">
          <video
            :src="courseInfo.courseList[currentCourseIdx].videoUrl"
            autoplay
            controls="controls"
          />
        </div>
      </div>
      <div class="video-menu">
        <div class="list-test">
          <div class="test-name">课程列表</div>
          <div class="list-wrapper">
            <div
              class="episode-box"
              v-for="(item, index) in courseInfo.courseList"
              :key="item.title"
              :class="{ current: index == currentCourseIdx }"
            >
              <span @click="switchEpisode(index)"
                >第{{ index + 1 }}集：{{ item.title }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="below-box">
      <div class="comment-wrapper">
        <div class="title">
          评论 <span class="number">{{ commentList.length }}</span>
        </div>
        <div
          class="comment-box"
          v-for="item in commentList"
          :key="item.content"
        >
          <div class="user-box">
            <div class="avatar-box">
              <img :src="item.avatar" alt="" v-if="item.avatar" />
            </div>
            <div class="comment-content">
              <div class="username">{{ item.username }}</div>
              <div class="comment">{{ item.content }}</div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
      <div class="ppt-box">
        本集ppt资源：
        <el-button
          type="primary"
          v-if="courseInfo.courseList[currentCourseIdx].fileUrl"
        >
          下载
        </el-button>
        <span v-else>暂无资源</span>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/common/header";
import Footer from "@/components/common/Footer";
import courseService from "@/api/course.js";
import userService from "@/api/user.js";

export default {
  data() {
    return {
      ifLogin: false,
      courseId: "",
      currentCourseIdx: 0,
      courseInfo: {
        name: "课程标题",
        courseList: [
          {
            title: "分集1标题",
            videoUrl: "",
            fileUrl: "",
          },
          {
            title: "分集2标题",
            videoUrl: "",
            fileUrl: "",
          },
          {
            title: "分集3标题",
            videoUrl: "",
            fileUrl: "",
          },
        ],
      },
      commentList: [
        {
          avatar: "",
          username: "用户1",
          content: "评论内容",
        },
        {
          avatar: "",
          username: "用户2",
          content: "撒大声地骄傲发打上单偶发收件人第哦亲我佛阿斯加德",
        },
        {
          avatar: "",
          username: "用户3",
          content: "阿萨德请我地闹市口魔法老师度发的",
        },
      ],
      userInfo: {},
    };
  },
  components: { Header, Footer },
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
      if (res.success) this.userInfo = res.userInfo;
      else this.$message.error(res.message);
    },
    checkToken() {
      if (!localStorage.getItem("token")) {
        this.$message.error("请先登录再进入课程详情");
        this.$router.push("/user");
        return false;
      }
      return true;
    },
    toUser() {
      this.$router.push("/user");
    },
    download(item) {
      // console.log('下载文件');
      let url = JSON.parse(item).response.fileUrl;
      window.open(url);
    },
    switchEpisode(idx) {
      this.currentCourseIdx = idx;
    },
  },
  created() {
    this.ifLogin = sessionStorage.getItem("ifLogin");
  },
  mounted() {
    // 通过课程id获取课程详情以及评论数
    // if (!this.checkToken()) return;
    this.courseId = this.$route.query.courseId;
    this.fetchCourseDetail(this.courseId);
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: calc(100% - 64px);
  .content {
    position: relative;
    height: 100%;
    width: 1440px;
    margin: auto;
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
        height: 100%;

        .test-name {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
          margin-bottom: 10px;
          border-bottom: 1px solid #ccc;
          font-size: 20px;
          font-weight: 600;
        }

        .icon-wrapper {
          height: calc(100% - 130px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .list-wrapper {
          min-height: calc(100% - 110px);
          overflow-y: auto;

          .current {
            color: blue;
          }

          .episode-box {
            height: 40px;
            display: flex;
            align-items: center;
            padding: 10px;

            span {
              &:hover {
                cursor: pointer;
                color: blue;
              }
            }
          }
        }
      }
    }
  }

  .below-box {
    display: flex;
    justify-content: space-between;
    width: 1440px;
    margin: 30px auto;

    .comment-wrapper {
      width: 1100px;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px;

      .comment-box {
        margin-bottom: 25px;

        .user-box {
          display: flex;

          .avatar-box {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #9e9e9e;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .comment-content {
            margin-left: 10px;

            .username {
              margin-bottom: 5px;
              color: #61666d;
              font-size: 14px;
            }
          }
        }
      }
    }

    .ppt-box {
      height: 70px;
      width: 330px;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px;
      display: flex;
      align-items: center;
    }

    .title {
      height: 34px;
      margin-right: 6px;
      margin-bottom: 10px;
      line-height: 34px;
      pointer-events: none;
      font-weight: 500;
      font-size: 20px;
    }
  }
}
</style>

<style lang="less">
.comment-box {
  .el-divider--horizontal {
    margin: 12px 0;
  }
}
</style>
