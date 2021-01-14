<template>
  <div class="wrapper">
    <div class="persInfoBox">
      <span class="infoLabel">
        课程学习记录
      </span>
      <div class="course-box" v-for="item in list.slice((currentPage-1)*3,currentPage*3)" :key="item.id">
        <div class="data-list">
          <div class="course-pic">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="course-info">
            <div class="info-left">
              <div class="courseName">
                {{item.title}}
              </div>
              <div class="courseIntro">
                {{item.intro}}
              </div>
            </div>
            <div class="info-right">
              <div class="course-menu">
               进度
              </div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
      
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="3"
      layout="prev, pager, next, jumper"
      :total="list.length">
    </el-pagination>
  </div>
</template>

<script>
import { allList } from '@/assets/util/data.js'

export default {
  data() {
    return {
      list: [],
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    this.list = allList
    console.log(allList);
  }
}
</script>

<style lang="less" scoped>
  .wrapper {
    text-align: center;
  }

  .persInfoBox {
    min-height: 270px;
    width: 100%;
    text-align: left;
    
    .infoLabel {  
      font-size: 16px;
      color: #2A2A2A;
      line-height: 26px;
      font-weight: bold;
      margin: 28px 0 0 30px;
      display: inline-block;
    }

    .course-box {
      width: 600px;
      margin: auto;

      .data-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        font-size: 16px;
        color: #777777;

        .course-pic {
          width: 160px;
          height: 90px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .course-info {
          width: 430px;
          height: 90px;
          display: flex;
          justify-content: space-between;

          .info-left {
            .courseName {
              max-width: 100%;
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              color: #2a2a2a;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .courseIntro {
              display: block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 18px;
              line-height: 18px;
              font-size: 12px;
              color: #333;
            }
          }

          .info-right {
            height: 90px;
            line-height: 90px;
          }
        }
      }
    }
  }
</style>