<template>
  <div class="wrapper">
    <Header :ifIndex="false"/>
    <div class="info-box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <AccountSetting/>
        </el-tab-pane>
        <el-tab-pane label="账号管理" name="second">
          <BasicInfo/>
        </el-tab-pane>
        <el-tab-pane label="学习进度" name="third">
          <CoursePlan/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/header'
import AccountSetting from './AccountSetting'
import BasicInfo from './BasicInfo'
import CoursePlan from './CoursePlan'

export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  components: { Header, AccountSetting, BasicInfo, CoursePlan },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .info-box {
    width: 765px;
    margin: 30px auto;
    min-height: 600px;
    background-color: #fff;
    padding: 20px 30px 0;
  }
</style>

<style>
  .el-tabs__item.is-active {
    color: #2a2a2a;
    font-weight: 600;
  }
  .el-tabs__item {
    color: #777;
  }

  .el-tabs__item:hover {
    color: #4b4a4a;
  }
  .el-tabs__active-bar {
    background-color: #2a2a2a;
  }
</style>