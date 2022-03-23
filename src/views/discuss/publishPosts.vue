<template>
  <div class="wrapper">
    <Header :ifIndex="false" />
    <div class="content-wrapper">
      <div class="title-box">
        <el-input v-model="title" placeholder="在此输入标题"></el-input>
      </div>

      <div class="editor-box"></div>
      <div class="btn-box">
        <el-button round @click="handleCancel">取消</el-button>
        <el-button type="primary" round @click="handlePublish">发布</el-button>
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
      title: "",
    };
  },
  components: { Header, Footer },
  methods: {
    handleCancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.content-wrapper {
  width: 1400px;
  margin: 20px auto 0;

  .title-box {
    height: 100px;
    background-color: #fff;
    display: flex;
    align-items: center;

    input {
      height: 60px;
    }
  }

  .editor-box {
    width: 1400px;
    margin: 20px auto 0;
    background-color: #fff;
    height: 600px;
  }

  .btn-box {
    margin: 20px 0;
    text-align: end;
  }
}
</style>

<style lang="less">
.title-box {
  .el-input__inner {
    height: 60px;
    font-size: 36px;
  }

  input::-webkit-input-placeholder {
    /* placeholder颜色 */
    color: #aab2bd;
    /* placeholder字体大小 */
    font-size: 36px;
  }
}
</style>
