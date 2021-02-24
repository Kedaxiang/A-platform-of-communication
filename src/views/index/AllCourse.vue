<template>
  <div class="wrapper">
    <div class="search-box">
      <div class="search">
        <el-input
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="searchInput"
        >
        </el-input>
      </div>
      <el-button type="primary">搜索</el-button>
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
      searchInput: "",
      pageQuery: {
        page: 1,
        size: 6,
      },
      list: [],
      total: 0
    };
  },
  components: { CourseBox },
  // props: ['list'],
  methods: {
    async fetchAllCourse() {
      let res = await courseService.getAll(this.pageQuery);
      console.log(res);
      if (res.success) [this.total, this.list] = [res.data.totalCount, res.data.list];
    },
  },
  mounted() {
    this.fetchAllCourse();
  },
};
</script>

<style>
.pagination-wrapper .el-pagination {
  margin-top: 50px;
  text-align: center;
  background-color: rgba(244, 244, 244, 1);
}
</style>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 750px;
  margin: auto;

  .search {
    width: 650px;
  }
}
</style>