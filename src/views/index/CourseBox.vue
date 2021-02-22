<template>
  <div class="box-wrapper">
    <div class="course-box"
         v-for="item in list"
         :key="item.id">
      <div class="pic-box" @mouseover="showCover(item.id)" @mouseout="preset()" @click="toVideo">
        <div class="cover">
          <i class="el-icon-video-play"></i>
        </div>
        <img :src="item.picUrl" alt="">
      </div>
      <div class="title">
        <span>{{item.name}}</span>
      </div>
      <div class="intro">
        <span>{{item.introduction }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: ''
    }
  },
  props: ['list'],
  methods: {
    showCover(id) {
      this.id = id;
    },
    preset() {
      this.id = ''
    },
    toVideo() {
      this.$router.push('/videoStudy')
    }
  },
  
}
</script>

<style scoped lang="less">
  .box-wrapper {
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px 20px;

    .course-box {
      width: 400px;
      height: 255px;
      margin-top: 20px;
      margin-left: 20px;

      .pic-box {
        width: 400px;
        height: 196px;
        overflow: hidden;
        position: relative;
        
        &:hover {
          img {
            transform: scale(1.2);
            background-color: #fff;
          }

          .cover {
            visibility: visible;
            opacity: 1;
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 60px;
            background: rgba(0, 0, 0, 0.6);
          }
        }

        .cover {
          visibility: hidden;
          opacity: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 60px;
          background: rgba(0, 0, 0, 0.6);
          transition: all .5s;
          z-index: 999;
        }

        img {
          width: 100%;
          height: 100%;
          transition: all 0.5s;
        }
      }

      .title {
        line-height: 24px;
        margin-top: 10px;
        font-size: 16px;
        overflow: hidden;
        width: 240px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 650;
      }

      .intro {
        line-height: 20px;
        margin-top: 10px;
        font-size: 14px;
        color: #9C9C9C;
        overflow: hidden;
        width: 240px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  span {
    cursor: pointer;
  }
</style>