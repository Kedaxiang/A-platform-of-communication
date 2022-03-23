<template>
  <div class="wrapper">
    <div class="tab-wrapper">
      <div class="tab-item" id="dynamic">发动态</div>
      <div class="tab-item" id="posts" @click="toPublishPosts">发帖子</div>
    </div>
    <div class="textarea-box">
      <el-input
        resize="none"
        type="textarea"
        placeholder="请输入内容"
        :autosize="{ minRows: 2, maxRows: 4 }"
        v-model="content"
      >
      </el-input>
    </div>

    <el-button type="info" round @click="publish()">发布</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  created() {},
  methods: {
    publish() {
      this.$message.success("发布成功:" + this.content);
    },
    toPublishPosts() {
      this.$router.push("/publish");
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 690px;
  background-color: #fff;
  padding: 15px;
  text-align: end;

  .tab-wrapper {
    display: flex;

    .tab-item {
      width: 70px;
      padding: 5px;
      text-align: center;
      color: #9e9e9e;
      margin-right: 10px;
      cursor: pointer;
    }

    #dynamic {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 2px;
        background-color: #9e9e9e;
      }
    }

    #posts {
      &:hover {
        color: #767272;
      }
    }
  }

  .textarea-box {
    margin: 15px 0;
  }
}
</style>

<style>
.el-textarea__inner {
  background-color: #f4f4f4;
  color: #9e9e9e;
}

::-webkit-input-placeholder {
  color: #9e9e9e;
}
</style>
