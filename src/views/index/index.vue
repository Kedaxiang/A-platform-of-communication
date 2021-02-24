<template>
  <div class="wrapper">
    <Header class="header" @fromChild="getVal" :ifIndex="true"/>
    <div class="content-wrapper" v-if="!ifShowAllCourse">
      <Carousel/>
      <div 
        class="course-box_wrapper" 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(244, 244, 244, .8)"> 
        <div class="box-title" ref="idx0">
          <div>编辑推荐</div>
        </div>
        <CourseBox :list="recommendList"/>
        <el-divider></el-divider>
      </div>
      <div class="course-box_wrapper">
        <div class="box-title" ref="idx1">
          最新课程
        </div>
        <CourseBox :list="newestList"/>
        <el-divider></el-divider>
      </div>
      <div class="course-box_wrapper">
        <div class="box-title" ref="idx2">
          最热课程
        </div>
        <CourseBox :list="hotList"/>
      </div>
    </div>
    <div class="course-wrapper" v-else>
      <AllCourse :list="allList"/>
    </div>
    <div class="footer">
        copyright@喵娘大大
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/header'
import Carousel from './Carousel'
import CourseBox from './CourseBox'
import AllCourse from './AllCourse'

import courseServer from '@/api/course.js'

export default {
  data() {
    return {
      ifShowAllCourse: false,
      recommendList: [],
      newestList: [],
      hotList: [],
      allList: [],
      loading: true,
    }
  },
  methods: {
    toMore() {
      this.ifShowAllCourse = true;
    },
    getVal(el) {
      if(el == 3) {
        this.ifShowAllCourse = true;
      } else {
        let _this = this;
        this.ifShowAllCourse = false;
        setTimeout(() => {_this.fixScroll(el)}, 50)
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
      const getHot = courseServer.getHot()
      const getLatest = courseServer.getLatest()
      const getRecommend = courseServer.getRecommend()
      Promise.all([getRecommend, getLatest, getHot])
        .then(res => {
          [this.recommendList, this.newestList, this.hotList]
            = [res[0].recommendList, res[1].recommendList, res[2].hotList]
          // console.log(res);
        })
    }
  },
  components: { Header, Carousel, CourseBox, AllCourse },
  created() {
    // [this.recommendList, this.newestList, this.hotList, this.allList] = [recommendList, newestList, hotList, allList];
    setTimeout(() => {
      this.loading = false;
    }, 1000)
    this.getData()
  }
}
</script>

<style scoped lang="less">
  .wrapper {
    .header {
      margin-bottom: 20px;
    }

    .content-wrapper {
      padding: 0 30px 20px;

      .course-box_wrapper {
        width: 1400px;
        margin: auto;

        .box-title {
          display: flex;
          justify-content: space-between;
          margin-top: 25px ;
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
    }

    .footer {
      padding: 50px 0 20px;
      text-align: center;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.447);
      line-height: 21px;
    }
  }
</style>