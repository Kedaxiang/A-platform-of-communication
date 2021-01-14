<template>
  <div class="wrapper">
    <div class="search-box">
      <div class="search">
        <el-input
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="input1">
        </el-input>
      </div>
      <el-button type="primary">搜索</el-button>
    </div>
    <CourseBox :list="list.slice((currentPage-1)*6,currentPage*6)"/>
    <div class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="6"
        layout="prev, pager, next, jumper"
        :total="list.length">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
import CourseBox from './CourseBox'

export default {
  data() {
    return {
      currentPage: 1
    }
  },
  components: { CourseBox },
  props: ['list'],
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    }
  }
}
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