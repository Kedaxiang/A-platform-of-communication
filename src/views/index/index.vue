<template>
  <div class="wrapper">
    <Header class="header" @fromChild="getVal" :ifIndex="true" />
    <div class="content-wrapper" v-if="!ifShowAllCourse">
      <Carousel :list="carouselList" style="width: 1440px; margin: auto" />
      <!-- <div 
        class="course-box_wrapper" 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(244, 244, 244, .8)">  -->
      <div class="course-box_wrapper">
        <div class="box-title" ref="idx1">热门课程</div>
        <CourseBox :list="hotList" />
        <el-divider></el-divider>
      </div>
      <div class="discuss-box_wrapper">
        <div class="item-box">
          <div class="box-title" ref="idx1">热门讨论</div>
          <DiscussBox :list="hotDicussList" :type="'discuss-item'" />
        </div>
        <div class="item-box">
          <div class="box-title" ref="idx1">公告</div>
          <DiscussBox :list="noticeList" :type="'notice-item'" />
        </div>
      </div>
    </div>
    <el-footer>copyright@wangyanhai</el-footer>
  </div>
</template>

<script>
import Header from "@/components/common/header";
import Carousel from "./Carousel";
import CourseBox from "./CourseBox";
import AllCourse from "./AllCourse";
import DiscussBox from "./discussBox.vue";

import courseServer from "@/api/course.js";
import {
  carouselList,
  hotList,
  hotDicussList,
  noticeList,
} from "@/assets/util/data.js";

export default {
  data() {
    return {
      ifShowAllCourse: false,
      hotList: [], // 热门课程
      carouselList: [], // 轮播图
      hotDicussList: [], // 热门讨论列表
      noticeList: [], // 公告列表
      loading: true,
      id: -1,
    };
  },
  watch: {
    recommendList(val) {
      this.handleNumber(val, this.recommendList);
    },
    newestList(val) {
      this.handleNumber(val, this.newestList);
    },
    hotList(val) {
      this.handleNumber(val, this.hotList);
    },
  },
  methods: {
    toMore() {
      this.ifShowAllCourse = true;
    },
    getVal(el) {
      if (el == 3) {
        this.ifShowAllCourse = true;
      } else {
        let _this = this;
        this.ifShowAllCourse = false;
        setTimeout(() => {
          _this.fixScroll(el);
        }, 50);
      }
    },
    fixScroll(el) {
      let _this = this;
      let windowH = window.innerHeight; //浏览器窗口高度
      let h = this.$refs[`idx${el}`].offsetHeight; //模块内容高度
      let t = this.$refs[`idx${el}`].offsetTop; //模块相对于内容顶部的距离
      let top = t;
      // let top = t - (windowH - h) / 2; //需要滚动到的位置，若改为 t 则滚动到模块顶部位置，此处是滚动到模块相对于窗口垂直居中的位置
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; //滚动条距离顶部高度
      let currentTop = scrollTop; //默认滚动位置为当前滚动条位置，若改为0，则每次都会从顶部滚动到指定位置
      let requestId;
      //采用requestAnimationFrame，平滑动画
      function step() {
        //判断让滚动条向上滚还是向下滚
        if (scrollTop < top) {
          if (currentTop <= top) {
            //   window.scrollTo(x,y) y为上下滚动位置
            window.scrollTo(0, currentTop);
            requestId = window.requestAnimationFrame(step);
          } else {
            window.cancelAnimationFrame(requestId);
          }
          //向下滚动
          currentTop += 50;
        } else {
          if (top <= currentTop) {
            //注：此处 - speed 是解决居中时存在的问题，可自行设置或去掉
            window.scrollTo(0, currentTop - 50);
            requestId = window.requestAnimationFrame(step);
          } else {
            window.cancelAnimationFrame(requestId);
          }
          //向上滚动
          currentTop -= 50;
        }
      }
      window.requestAnimationFrame(step);
    },
    async getData() {
      const getHot = courseServer.getHot();
      const getLatest = courseServer.getLatest();
      const getRecommend = courseServer.getRecommend();
      const getCarousel = courseServer.getCarousel();
      Promise.all([getRecommend, getLatest, getHot, getCarousel]).then(
        (res) => {
          [
            this.recommendList,
            this.newestList,
            this.hotList,
            this.carouselList,
          ] = [
            res[0].recommendList,
            res[1].recommendList,
            res[2].hotList,
            res[3].data,
          ];
          console.log(res);
        }
      );
    },
    handleNumber(val, list) {
      if (val.length < 3) {
        list.push({ id: this.id });
      }
      this.id--;
    },
  },
  components: { Header, Carousel, CourseBox, AllCourse, DiscussBox },
  created() {
    console.log(hotList);
    this.carouselList = carouselList;
    this.hotList = hotList;
    this.noticeList = noticeList;
    this.hotDicussList = hotDicussList;
    // [this.recommendList, this.newestList, this.hotList, this.allList] = [recommendList, newestList, hotList, allList];
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    // this.getData();
  },
};
</script>

<style scoped lang="less">
.wrapper {
  .header {
    margin-bottom: 20px;
  }

  .content-wrapper {
    padding: 0 30px 20px;

    .course-box_wrapper {
      width: 1300px;
      margin: auto;
    }

    .discuss-box_wrapper {
      width: 1300px;
      margin: auto;
      display: flex;
      justify-content: space-between;

      .item-box {
        width: 45%;

        .box-title {
          width: 100%;
        }
      }
    }

    .box-title {
      display: flex;
      justify-content: space-between;
      margin-top: 25px;
      font-weight: 650;
      font-style: normal;
      font-size: 28px;
      color: rgba(0, 0, 0, 0.847058823529412);
      line-height: 28px;

      .more {
        color: #c9c9c9;
        font-size: 20px;
        cursor: pointer;
        user-select: none;
      }
    }
  }

  .course-wrapper {
    height: 692px;
    position: relative;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 172px;
    background-color: #1d1d1d;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #9e9e9e;
    line-height: 21px;
  }
}
</style>

<style>
.el-footer {
  height: 172px !important;
  background-color: #1d1d1d;
  color: #9e9e9e;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
