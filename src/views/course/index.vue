<template>
  <div class="wrapper">
    <Header :ifIndex="false" />
    <div class="course-box">
      <!-- 搜索框 -->
      <div class="search-box">
        <el-input
          placeholder="请输入课程名称"
          v-model="input"
          clearable
          prefix-icon="el-icon-search"
        >
        </el-input>
      </div>
      <!-- 快速查找 -->
      <div class="quick-search_box">
        <h1>快速查找:</h1>
        <div class="quick-search">
          根据班级查找：
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"
            clearable="true"
          />
        </div>
        <div class="quick-search">
          是否只展示公共课：
          <el-switch
            v-model="isCommon"
            active-color="#13ce66"
            inactive-color="#9e9e9e"
          />
        </div>
      </div>
      <!-- 课程展示 -->
      <div class="course-wrapper">
        <ul class="mod-ul">
          <li class="mod-li" v-for="item in courseList" :key="item.id">
            <div class="item-wrapper">
              <div class="img-box">
                <img :src="item.picUrl" alt="" />
              </div>
              <div class="title-wrapper">
                <div class="course-name">{{ item.title }}</div>
                <div class="teacher-name">{{ item.teacher }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div style="text-align: center">
        <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/common/header";
import Footer from "@/components/common/Footer";
import { allList } from "@/assets/util/data.js";

export default {
  data() {
    return {
      input: "",
      value: [],
      isCommon: false,
      options: [
        {
          value: "xinxigongcheng",
          label: "信息工程学院",
          children: [
            {
              value: "xinxigongcheng",
              label: "信息工程",
            },
            {
              value: "dianzixinxigongcheng",
              label: "电子信息工程",
            },
            {
              value: "tongxingongcheng",
              label: "通信工程",
            },
            {
              value: "jichengdianlu",
              label: "集成电路",
            },
          ],
        },
      ],
      courseList: [],
    };
  },
  components: { Header, Footer },
  created() {
    // 获取课程详情数据以及选项数据
    this.courseList = allList;
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="less" scoped>
.course-box {
  width: 1440px;
  margin: 50px auto 30px;
  min-height: 600px;
  background-color: #fff;
  padding: 30px;

  .search-box {
    width: 500px;
  }

  .quick-search_box {
    margin-top: 20px;

    h1 {
      font-size: 24px;
      margin-bottom: 5px;
    }

    .quick-search {
      margin-bottom: 10px;
    }
  }

  .course-wrapper {
    width: 1280px;
    margin: 30px auto 0;
    min-height: 90px;

    .mod-ul {
      margin-right: -20px;

      .mod-li {
        vertical-align: top;
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 30px;
        position: relative;
        width: 240px;
        overflow: hidden;
        cursor: pointer;

        .item-wrapper {
          .img-box {
            width: 240px;
            border-radius: 4px;
            height: 135px;
            overflow: hidden;

            img {
              width: 100%;
            }
          }

          .title-wrapper {
            padding-top: 10px;

            .course-name {
              line-height: 24px;
              width: 100%;
              font-size: 16px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 10px;
              font-weight: 600;
            }

            .teacher-name {
              line-height: 20px;
              width: 100%;
              font-size: 14px;
              color: #777;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
