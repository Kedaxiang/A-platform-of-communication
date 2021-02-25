<template>
  <div class="wrapper">
    <div class="search-box">
      <div class="back-box" @click="isShowAll || fetchAllCourse()" ref="backBox">
        <i class="el-icon-back"></i>全部课程列表
      </div>
      <div class="search">
        <el-input
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="name"
        >
        </el-input>
      </div>
      <el-button type="primary" @click="searchCourse">搜索</el-button>
    </div>
    <!-- <CourseBox :list="list.slice((currentPage-1)*6,currentPage*6)"/> -->
    <CourseBox :list="list" />
    <div class="pagination-wrapper">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="pageQuery.size"
        background
        @current-change="
          ($event) => {
            pageQuery.page = $event;
            fetchAllCourse();
          }
        "
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CourseBox from "./CourseBox";
import courseService from "@/api/course.js";

export default {
  data() {
    return {
      currentPage: 1,
      name: "",
      pageQuery: {
        page: 1,
        size: 6,
      },
      list: [],
      total: 0,
      id: -1,
      isShowAll: true
    };
  },
  components: { CourseBox },
  props: ["ifShowAllCourse"],
  watch: {
    list(val) {
      if (val.length < 6) {
        this.list.push({ id: this.id });
      }
      this.id--;
    },
  },
  methods: {
    async fetchAllCourse() {
      this.$refs.backBox.style.opacity = '0'
      this.isShowAll = true;
      let res = await courseService.getAll(this.pageQuery);
      // console.log(res);
      if (res.success)
        [this.total, this.list] = [res.data.totalCount, res.data.list];
    },
    async searchCourse() {
      this.$refs.backBox.style.opacity = '1'
      this.isShowAll = false;
      let res = await courseService.searchCourse({
        name: this.name,
        page: this.pageQuery.page,
        size: this.pageQuery.size,
      });
      console.log(res);
      if (res.success) {
        [this.list, this.total] = [res.data.list, res.data.totalCount];
      }
    },
  },
  mounted() {
    this.fetchAllCourse();
  },
};
</script>

<style>
.pagination-wrapper .el-pagination {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  background-color: rgba(244, 244, 244, 1);
}
</style>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;
  margin: auto;

  .back-box {
    display: flex;
    align-items: center;
    opacity: 0;
    transition: .3s;
    color: #ccc;
    cursor: pointer;
  }

  .search {
    width: 650px;
    margin-left: 10px;
  }
}
</style>