<template>
  <div class="dynamic-box">
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
      <div class="icons">
        <div class="icon">
          <img :src="info.isLike ? icons.like : icons.likeUnClick" alt="" />
          {{ info.likes }}
        </div>

        <div class="icon" @click="openComment">
          <img :src="icons.comment" alt="" />
          {{ info.comments.length }}
        </div>
      </div>
    </div>
    <!-- 评论区 -->
    <div class="comment-box" :class="{ show: showComments }">
      评论区
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: {
        like: require("../../assets/img/like.png"),
        likeUnClick: require("../../assets/img/like_unClick.png"),
        comment: require("../../assets/img/comment.png"),
      },
      showComments: false,
    };
  },
  props: {
    info: {
      type: Object,
    },
  },
  methods: {
    openComment(idx) {
      this.showComments = !this.showComments;
    },
  },
};
</script>

<style lang="less" scoped>
.dynamic-box {
  background: #fff;
  min-height: 150px;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;

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
    display: flex;
    justify-content: space-between;

    .icons {
      display: flex;

      .icon {
        display: flex;
        align-items: center;
        height: 25px;
        margin-right: 25px;

        img {
          width: 25px;
          height: 25px;
          margin-right: 2px;
          cursor: pointer;
        }
      }
    }

    .checkAll {
      cursor: pointer;
      color: #9e9e9e;

      &:hover {
        color: #818181;
      }
    }
  }

  .comment-box {
    min-height: 0px;
    max-height: 0px;
    overflow: hidden;
    transition: all 0.3s;
  }

  .show {
    min-height: 50px;
    max-height: auto;
  }
}
</style>
