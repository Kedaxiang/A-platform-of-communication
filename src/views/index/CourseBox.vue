<template>
  <div class="box-wrapper">
    <div class="float-left_box">
      <div
        class="pic-box"
        @mouseover="showCover(list[0].id)"
        @mouseout="preset()"
        @click="toVideo(list[0].id)"
      >
        <div class="cover">
          <i class="el-icon-video-play"></i>
        </div>
        <img :src="list[0].picUrl" alt="" />
      </div>
      <div class="title">
        <span>{{ list[0].title }}</span>
      </div>
      <div class="intro">
        <span>{{ list[0].intro }}</span>
      </div>
    </div>
    <ul>
      <li
        class="course-box"
        v-for="item in list.slice(1, list.length)"
        :key="item.id"
      >
        <div
          class="pic-box"
          @mouseover="showCover(item.id)"
          @mouseout="preset()"
          @click="toVideo(item.id)"
        >
          <div class="cover">
            <i class="el-icon-video-play"></i>
          </div>
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="title">
          <span>{{ item.title }}</span>
        </div>
        <div class="intro">
          <span>{{ item.intro }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      pathInfo: {
        path: "videoStudy",
        query: {
          courseId: "",
        },
      },
    };
  },
  props: ["list"],
  methods: {
    showCover(id) {
      this.id = id;
    },
    preset() {
      this.id = "";
    },
    toVideo(id) {
      this.pathInfo.query.courseId = id;
      this.$router.push(this.pathInfo);
    },
  },
};
</script>

<style scoped lang="less">
.box-wrapper {
  margin: auto;
  height: 428px;

  .float-left_box {
    width: 500px;
    height: 100%;
    float: left;
    margin: 20px 20px 0 0;
    position: relative;
    cursor: pointer;

    .pic-box {
      width: 500px;
      height: 280px;
      overflow: hidden;
      position: relative;
      cursor: pointer;

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
        transition: all 0.8s;
        z-index: 999;
      }

      img {
        width: 100%;
        height: 100%;
        transition: all 0.8s;
      }

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
    }

    .title {
      line-height: 34px;
      margin-top: 10px;
      font-size: 24px;
      overflow: hidden;
      width: 500px;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 650;
    }

    .intro {
      line-height: 20px;
      margin-top: 10px;
      font-size: 14px;
      color: #9c9c9c;
      overflow: hidden;
      width: 240px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .course-box {
    width: 240px;
    height: 200px;
    margin-top: 20px;
    margin-left: 20px;
    float: left;

    .pic-box {
      width: 240px;
      height: 135px;
      overflow: hidden;
      position: relative;
      cursor: pointer;

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
        transition: all 0.8s;
        z-index: 999;
      }

      img {
        width: 100%;
        height: 100%;
        transition: all 0.8s;
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
      color: #9c9c9c;
      overflow: hidden;
      width: 240px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

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
  }
}
span {
  cursor: pointer;
}
</style>
