<template>
  <div class="wrapper">
    <!-- <div class="dynamic-box" v-for="item in list" :key="item.author">
      <div class="userinfo-box">
        <div class="avatar-box">
          <img :src="item.avatar" alt="用户头像" v-if="item.avatar" />
          <span v-else>暂无头像</span>
        </div>
        <div class="info-box">
          <p class="text">{{ item.author }}</p>
          <p class="text">{{ item.class }}</p>
        </div>
      </div>
      <div class="content-box">
        {{ item.content }}
      </div>
      <div class="footer">
        <div class="icons">
          <div class="icon">
            <img :src="item.isLike ? icons.like : icons.likeUnClick" alt="" />
            {{ item.likes }}
          </div>

          <div class="icon" @click="openComment">
            <img :src="icons.comment" alt="" />
            {{ item.comments.length }}
          </div>
        </div>
      </div>
      <div class="comment-box" :class="{ show: showComments }">
        评论区
      </div>
    </div> -->
    <DynamicBox v-for="item in list" :key="item.author" :info="item" />
  </div>
</template>

<script>
import DynamicBox from "./dynamicBox.vue";

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
  components: { DynamicBox },
  props: {
    list: {
      type: Array,
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
.wrapper {
  width: 690px;
}
</style>
