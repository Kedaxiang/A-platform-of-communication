<template>
  <div class="wrapper">
    <div class="tab-wrapper">
      <div
        class="tab-item"
        v-for="(item, index) in tabList"
        :key="item"
        :class="{ 'actived-item': currentIndex === index }"
        @click="handleTabClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <PublishBox class="style-box" />
    <div class="content-wrapper">
      <!-- 动态 -->
      <Dynamic v-show="currentIndex === 0" :list="dynamicList" />
      <!-- 公告 -->
      <Notice v-show="currentIndex === 2" />
      <!-- 帖子 -->
      <Posts v-show="currentIndex === 1" />
    </div>
  </div>
</template>

<script>
// 动态组件
import Dynamic from "./dynamic.vue";
// 帖子组件
import Posts from "./posts.vue";
// 公告组件
import Notice from "./notice.vue";
// 发帖组件
import PublishBox from "./publishBox.vue";
import { dynamicList } from "../../assets/util/data";

export default {
  data() {
    return {
      currentIndex: 0,
      tabList: ["动态", "帖子", "公告"],
      dynamicList: [],
    };
  },
  components: { Dynamic, Posts, Notice, PublishBox },
  created() {
    this.dynamicList = dynamicList;
  },
  methods: {
    handleTabClick(idx) {
      this.currentIndex = idx;
    },
  },
};
</script>

<style lang="less" scoped>
.tab-wrapper {
  display: flex;

  .tab-item {
    background-color: #9f9b9b;
    width: 85px;
    height: 41px;
    color: #fff;
    line-height: 41px;
    border-radius: 20px;
    text-align: center;
    margin-right: 10px;
    cursor: pointer;
  }

  .actived-item {
    background-color: #fff;
    color: #9f9b9b;
  }
}

.content-wrapper {
  margin-top: 20px;
}

.style-box {
  margin-top: 30px;
}
</style>
