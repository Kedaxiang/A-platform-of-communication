<template>
  <div class="box-wrapper">
    <!-- 主页中热门讨论的大盒子 -->
    <div
      class="discuss-item_box item-box_wrapper"
      v-if="type === 'discuss-item'"
    >
      <div class="item-box" v-for="item in list" :key="item.title">
        <!-- 用户头像加用户名 -->
        <div class="userinfo-box">
          <div class="avatar-box">
            <img :src="item.avatar" alt="" v-if="item.avatar" />
          </div>
          <div class="username-box">{{ item.author }}</div>
        </div>
        <h1 style="margin-top: 10px">{{ item.title }}</h1>
        <p class="content-box">
          {{ item.content }}
        </p>
      </div>
    </div>
    <!-- 主页中公告的大盒子 -->
    <div class="notice-item_box item-box_wrapper" v-if="type === 'notice-item'">
      <div class="item-box" v-for="item in list" :key="item.title">
        <div class="time-box">
          <div class="day">{{ item.day }}</div>
          <div class="time">{{ item.time }}</div>
        </div>
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
    },
    list: {
      type: Array,
    },
  },
};
</script>

<style lang="less" scoped>
.item-box {
  background-color: #fff;
  margin-top: 20px;
  padding: 15px;
  max-height: 150px;
  overflow: hidden;
  width: 100%;

  // 热门讨论标签的样式
  .userinfo-box {
    display: flex;
    align-items: center;

    .avatar-box {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #d8d8d8;
      margin-right: 10px;
    }
    .username-box {
      font-size: 15px;
      color: #9e9e9e;
    }
  }

  .content-box {
    margin-top: 5px;
    color: #9e9e9e;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2; // 设置两行文字溢出
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
}

.notice-item_box {
  // 公告标签的样式
  .item-box {
    display: flex;

    .time-box {
      // width: 56px;
      background-color: #dcdcdc;
      padding: 5px;
      margin-right: 20px;

      .day {
        height: 24px;
        line-height: 24px;
        color: #b05876;
        font-size: 20px;
        font-weight: 700;
        border-bottom: 1px solid #c0c0c0;
        text-align: center;
        margin: 5px;
      }

      .time {
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #6e6e6e;
        text-align: center;
      }
    }
  }
}
</style>
