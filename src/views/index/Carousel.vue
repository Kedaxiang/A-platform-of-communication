<template>
  <el-carousel :interval="4000" type="card" height="300px" trigger="click">
    <el-carousel-item v-for="item in list" :key="item.id">
      <img :src="item.photoUrl" alt="" @click="toVideo(item.courseId)"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      pathInfo: {
        path: 'videoStudy',
        query: {
          courseId: ''
        }
      }
    }
  },
  props: ["list"],
  methods: {
    toVideo(id) {
      // console.log(id);
      this.pathInfo.query.courseId = id
      this.$router.push(this.pathInfo)
    }
  }
};
</script>

<style scoped lang="less">
.medium {
  text-align: center;
}
</style>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

img {
  width: 100%;
  height: 100%;
}
</style>