<template>
  <div class="wrapper">
    <div class="persInfoBox">
      <span class="infoLabel"> 课程学习记录 </span>
      <div
        class="course-box"
        v-for="item in list"
        :key="item.id"
      >
        <div class="data-list">
          <div class="course-pic">
            <img :src="item.pictureUrl" alt="" />
          </div>
          <div class="course-info">
            <div class="info-left">
              <div class="courseName">
                {{ item.name }}
              </div>
              <div class="courseIntro">
                {{ item.introduction }}
              </div>
            </div>
            <div class="info-right">
              <div class="course-menu">已学习</div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
    <el-pagination
      layout="total, prev, pager, next"
      :total="total"
      :page-size="pageQuery.size"
      background
      @current-change="
        ($event) => {
          pageQuery.page = $event;
          fetchRecordList();
        }
      "
    >
    </el-pagination>
  </div>
</template>

<script>
import userService from "@/api/user.js";

export default {
  data() {
    return {
      list: [],
      pageQuery: {
        page: 1,
        size: 3,
      },
      total: 0
    };
  },
  methods: {
    async fetchRecordList() {
      let { page, size } = this.pageQuery;
      let res = await userService.getUserRecord(page, size);
      console.log(res);
      if(res.success) [this.total, this.list] = [res.data.totalCount, res.data.list];
    },
  },
  created() {
    this.fetchRecordList();
  },
};
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
    color: #2a2a2a;
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
            color: #9C9C9C;
          }
        }

        .info-right {
          height: 90px;
          line-height: 90px;

          .course-menu {
            color: #ccc;
          }
        }
      }
    }
  }
}
</style>