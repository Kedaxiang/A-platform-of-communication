<template>
  <div class="wrapper">
    <div class="user-box">
      <div class="info-box">
        <div class="avatar">
          <img :src="userInfo.avatar" alt="" />
        </div>
        <div class="user">
          <div class="username">{{ userInfo.username }}</div>
          <div class="class">{{ userInfo.class }}</div>
        </div>
      </div>
      <div class="basic-info">
        <div class="info-item">
          观看历史：
          <span
            v-for="item in userInfo.videoHistory"
            :key="item.classId"
            @click="toCourse(item.classId)"
            class="className"
          >
            {{ item.title }}
          </span>
        </div>
        <div class="info-item">评论数: {{ userInfo.commentNum }}</div>
        <div class="info-item">获赞数: {{ userInfo.beLikes }}</div>
      </div>
    </div>
    <div class="hot-posts_box">
      <div class="title">全站热门帖子</div>
      <el-divider></el-divider>
      <div class="posts-box">
        <div
          class="post-item"
          v-for="item in hotPostsList"
          :key="item.postId"
          @click="toPost(item.postId)"
        >
          <div class="post-title">{{ item.title }}</div>
          <div class="time">发表于: {{ item.time }}</div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: "",
        username: "王雁海",
        class: "2018级信息工程2班",
        videoHistory: [
          {
            pic: "",
            title: "课程1",
            classId: 1,
          },
          {
            pic: "",
            title: "课程2",
            classId: 2,
          },
        ],
        commentNum: 10,
        beLikes: 5,
      },
      hotPostsList: [
        {
          title: "标题1",
          time: "2022-02-28 23:59:59",
          postId: 1,
        },
        {
          title: "标题2",
          time: "2022-02-28 23:59:59",
          postId: 2,
        },
        {
          title: "标题3",
          time: "2022-02-28 23:59:59",
          postId: 3,
        },
        {
          title: "标题4",
          time: "2022-02-28 23:59:59",
          postId: 4,
        },
      ],
    };
  },
  created() {
    // 1. 发起请求获取和用户信息
    // 2. 获取热门帖子信息
  },
  methods: {
    toCourse(id) {
      // 通过课程Id跳转课程
      console.log(id);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 300px;

  .user-box {
    height: 200px;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;

    .info-box {
      display: flex;
      align-items: center;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #d8d8d8;
      }

      .user {
        margin-left: 5px;

        .username {
          font-size: 18px;
          color: #5b5656;
          margin-bottom: 5px;
        }

        .class {
          color: #c2bdbd;
          font-size: 12px;
        }
      }
    }

    .basic-info {
      margin-top: 20px;

      .info-item {
        margin-bottom: 8px;
        color: #9e9e9e;
        font-size: 15px;

        .className {
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .hot-posts_box {
    margin-top: 30px;
    border-radius: 20px;
    background-color: #fff;
    padding: 20px;

    .title {
      font-size: 24px;
      font-weight: 700;
      color: #666;
    }

    .posts-box {
      margin-top: 15px;

      .post-item {
        margin-bottom: 10px;

        .post-title {
          color: #737373;
          font-size: 16px;
          margin-bottom: 5px;

          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }

        .time {
          font-size: 12px;
          color: #b3b0b0;
        }
      }
    }
  }
}
</style>

<style lang="less">
.hot-posts_box {
  .el-divider--horizontal {
    margin: 5px 0;
  }
}
</style>
