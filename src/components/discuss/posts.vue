<template>
  <div class="wrapper">
    <PostBox v-for="item in postList" :key="item.id" :info="item" />
  </div>
</template>

<script>
import PostBox from "./postBox.vue";

export default {
  data() {
    return {
      postList: [
        {
          id: 1,
          avatar: "",
          author: "作者1",
          class: "2018级电子信息类2班",
          content:
            "简略的帖子内容简略的帖子内容简略的帖子内容简略的帖子内容简略的帖子内容",
        },
        {
          id: 2,
          avatar: "",
          author: "作者2",
          class: "2018级电子信息类2班",
          content:
            "简略的帖子内容简略的帖子内容简略的帖子内容简略的帖子内容简略的帖子内容",
        },
        {
          id: 3,
          avatar: "",
          author: "作者3",
          class: "2018级电子信息类2班",
          content:
            "简略的帖子内容简略的帖子内容简略的帖子内容简略的帖子内容简略的帖子内容",
        },
        {
          id: 4,
          avatar: "",
          author: "作者4",
          class: "2018级电子信息类2班",
          content:
            "简略的帖子内容简略的帖子内容简略的帖子内容简略的帖子内容简略的帖子内容",
        },
      ],
    };
  },
  components: { PostBox },
  created() {
    // 在这里获取帖子数据
  },
};
</script>

<style></style>
