<template>
  <div class="wrapper">
    <Header :ifIndex="false" />
    <div class="content-wrapper">
      <!-- 左侧：主要为帖子内容 -->
      <div class="left-box">
        <!-- 帖子的内容部分 -->
        <div class="post-content_box">
          <!-- 头部 -->
          <div class="content-header">
            <div class="user-box">
              <div class="avatar-box">
                <img
                  :src="postDetail.userInfo.avatar"
                  alt=""
                  v-if="postDetail.userInfo.avatar"
                />
              </div>
              <div class="userinfo">
                <div class="name">{{ postDetail.userInfo.username }}</div>
                <div class="class">{{ postDetail.userInfo.class }}</div>
              </div>
            </div>
            <div class="other">
              赞 {{ postDetail.likes }} | 回复 {{ postDetail.comments.length }}
            </div>
          </div>
          <!-- 分割线 -->
          <el-divider />
          <!-- 内容 -->
          <div class="content_box">
            <div class="post-title">
              {{ postDetail.postInfo.title }}
            </div>
            <div class="content">{{ postDetail.postInfo.content }}</div>
          </div>
          <!-- 底部内容（绝对定位）：点赞和时间 -->
          <div class="likes">
            <img :src="icons.likeUnClick" alt="" />
            <span style="color: #9e9e9e">{{ postDetail.likes }}</span>
          </div>
          <div class="post-time" style="text-align:end; color: #9e9e9e">
            发表于：{{ postDetail.time }}
          </div>
        </div>
        <!-- 帖子的评论部分 -->
        <div class="comments-box">
          <div class="comment-title">
            {{ postDetail.comments.length }}条回帖
          </div>
          <div
            class="comment-content_box"
            v-for="item in postDetail.comments"
            :key="item.content"
          >
            <div class="comment-info">
              <div class="comment-avatar">
                <img :src="item.avatar" alt="" v-if="item.avatar" />
              </div>
              <div class="comment-content">
                <div class="comment-name">{{ item.username }}</div>
                <p>{{ item.content }}</p>
              </div>
            </div>
            <div class="other-box">
              <div class="other-time" style="color: #3d3d3d; font-size: 12px">
                发表于：{{ item.time }}
              </div>
            </div>
          </div>
        </div>
        <!-- 帖子的回帖部分 -->
        <div class="to-comment">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
          />
          <div style="text-align: end; margin-top: 30px">
            <el-button type="info" :disabled="!textarea">回帖</el-button>
          </div>
        </div>
      </div>
      <!-- 右侧：为热门帖子直达 -->
      <div class="hot-posts_box">
        <div class="hot-posts_title">
          近期热帖
        </div>
        <div
          class="post-box"
          v-for="item in hotPosts"
          :key="item.id"
          @click="toPostDetail(item.id)"
        >
          <div class="hot-post_title">{{ item.title }}</div>
          <div class="time">发表于{{ item.time }}</div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/common/header";
import Footer from "@/components/common/Footer";
export default {
  data() {
    return {
      postDetail: {
        time: "2022-02-26 23:59:59",
        likes: 10,
        userInfo: {
          avatar: "",
          username: "王雁海",
          class: "2018级信息工程2班",
        },
        postInfo: {
          title: "标题标题标题",
          content: `内容内容内容内容内容
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容`,
        },
        comments: [
          {
            avatar: "",
            username: "姓名",
            content:
              "评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容",
            time: "2022-03-02 23:59:58",
          },
          {
            avatar: "",
            username: "姓名",
            content:
              "回帖内容回帖内容回帖内容回帖内容回帖内容回帖内容回帖内容回帖内容",
            time: "2022-03-03 23:59:59",
          },
        ],
      },
      hotPosts: [
        {
          id: 1,
          title: "帖子标题帖子标题",
          time: "2022-03-01",
        },
        {
          id: 2,
          title: "帖子标题帖子标题",
          time: "2022-03-01",
        },
        {
          id: 3,
          title: "帖子标题帖子标题",
          time: "2022-03-01",
        },
      ],
      pathInfo: {
        path: "post",
        query: {
          postId: "",
        },
      },
      // 静态图片资源
      icons: {
        like: require("../../assets/img/like.png"),
        likeUnClick: require("../../assets/img/like_unClick.png"),
      },
      textarea: "",
    };
  },
  components: { Header, Footer },
  created() {
    // 从这里获取到帖子id来获取帖子详情以及近期热帖
    console.log(this.$route.query.postId);
  },
  methods: {
    toPostDetail(idx) {
      this.pathInfo.query.postId = idx;
      // idx为帖子id
      this.$router.push(this.pathInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.content-wrapper {
  width: 70%;
  margin: 30px auto;
  display: flex;
  min-height: 600px;
  justify-content: space-between;

  .left-box {
    width: 70%;

    .post-content_box {
      background-color: #fff;
      min-height: 500px;
      padding: 30px;
      position: relative;
      .content-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }

      .user-box {
        display: flex;
        align-items: center;

        .avatar-box {
          width: 50px;
          height: 50px;
          background-color: #d8d8d8;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .userinfo {
          margin-left: 10px;
          color: #9e9e9e;

          .class {
            font-size: 14px;
          }
        }
      }

      .other {
        font-size: 14px;
        color: #9e9e9e;
      }

      .content_box {
        min-height: 400px;

        .post-title {
          font-size: 24px;
          font-weight: 700;
        }
        .content {
          padding: 30px;
          color: #9e9e9e;
        }
      }

      // 绝对定位的两个盒子
      .likes {
        position: absolute;
        bottom: 20px;
        left: 30px;
        width: 100px;
        height: 60px;
        background-color: #d8d8d8;
        display: flex;
        align-items: center;
        padding: 0 10px;

        img {
          width: 50px;
          height: 43px;
          cursor: pointer;
        }
      }
    }

    .comments-box {
      border-radius: 10px;
      padding: 20px;
      margin-top: 25px;
      min-height: 300px;
      background-color: #fff;

      .comment-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 25px;
      }

      .comment-content_box {
        margin-bottom: 20px;

        .comment-info {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .comment-avatar {
            min-width: 50px;
            height: 50px;
            background-color: #d8d8d8;
            overflow: hidden;
            border-radius: 50%;
          }

          .comment-content {
            color: #3d3d3d;
            margin-left: 10px;

            .comment-name {
              font-size: 15px;
              margin-bottom: 5px;
            }
          }
        }
      }
    }

    .to-comment {
      background-color: #fff;
      min-height: 200px;
      margin-top: 20px;
      border-radius: 10px;
      padding: 30px;
    }
  }

  .hot-posts_box {
    background-color: #fff;
    width: 25%;
    height: 280px;
    padding: 20px;

    .hot-posts_title {
      color: #3d3d3d;
      padding-bottom: 15px;
    }

    .post-box {
      margin-top: 10px;
      cursor: pointer;

      .hot-post_title {
        margin-bottom: 5px;
        font-weight: 700;
      }

      .time {
        font-size: 14px;
        color: #9e9e9e;
      }
    }

    .line {
      height: 1px;
      width: 100%;
      background-color: #d8d8d8;
      margin-top: 5px;
    }
  }
}
</style>
