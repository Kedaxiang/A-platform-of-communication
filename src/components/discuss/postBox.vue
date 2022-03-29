<template>
  <div class="post-box">
    <!-- 用户头像及基本信息 -->
    <div class="userinfo-box">
      <div class="avatar-box">
        <img :src="info.avatar" alt="用户头像" v-if="info.avatar" />
        <span v-else>暂无头像</span>
      </div>
      <div class="info-box">
        <p class="text">{{ info.author }}</p>
        <p class="text">{{ info.class }}</p>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content-box">
      {{ info.content }}
    </div>
    <!-- footer -->
    <div class="footer">
      <span class="checkAll" @click="toDetail(info.id)">点击查看全文</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pathInfo: {
        path: "post",
        query: {
          postId: "",
        },
      },
    };
  },
  props: {
    info: {
      type: Object,
    },
  },
  methods: {
    toDetail(idx) {
      this.pathInfo.query.postId = idx;
      // idx为帖子id
      this.$router.push(this.pathInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.post-box {
  background-color: #fff;
  background: #fff;
  min-height: 150px;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  cursor: pointer;

  .userinfo-box {
    display: flex;
    align-items: center;

    .avatar-box {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #d8d8d8;
      text-align: center;
      line-height: 50px;

      img {
        width: 100%;
        height: 100%;
      }

      span {
        color: #9e9e9e;
        font-size: 5px;
      }
    }

    .info-box {
      color: #9e9e9e;
      margin-left: 10px;
    }
  }

  .content-box {
    margin: 20px 0;
  }

  .footer {
    .checkAll {
      cursor: pointer;
      color: #9e9e9e;

      &:hover {
        color: #818181;
        text-decoration: underline;
      }
    }
  }
}
</style>
