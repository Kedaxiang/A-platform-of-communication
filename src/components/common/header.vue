<template>
  <div class="header-wrapper">
    <!-- 主页 -->
    <div class="header" v-if="ifIndex">
      <div class="left-box">
        <div class="logo" @click="toIndex">
          GDUT Elearning
        </div>
        <div class="tabs-wrapper">
          <div
            class="tab"
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ selected: idx == 0 && index == 0 }"
            @click="tabsClick(item.route, index)"
          >
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="btn">
          <el-tooltip class="item" effect="dark" placement="bottom">
            <div slot="content">
              联系我:<br />联系人: 王雁海<br />联系邮箱: 826107601@qq.com
            </div>
            <div><i class="el-icon-question" />帮助</div>
          </el-tooltip>
        </div>
        <div class="btn" @click="toUser" v-if="!ifLogin">
          登录/注册
        </div>
        <el-dropdown @command="handleCommand" v-else>
          <div class="user el-dropdown-link">
            <div class="avatar">
              <img :src="userInfo.headPortrait" alt="" />
            </div>
            <div class="userName">{{ userInfo.name }}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="toHome">个人主页</el-dropdown-item>
            <el-dropdown-item command="logout">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 个人主页 -->
    <div class="header" v-if="!ifIndex">
      <div class="left-box">
        <div class="logo" @click="toIndex">
          <i class="el-icon-arrow-left"></i>
          返回主页
        </div>
      </div>
      <div class="right-box">
        <div class="btn">
          <el-tooltip class="item" effect="dark" placement="bottom">
            <div slot="content">
              联系我:<br />联系人: 王雁海<br />联系邮箱: 826107601@qq.com
            </div>
            <div><i class="el-icon-question" />帮助</div>
          </el-tooltip>
        </div>
        <div class="btn" @click="toUser" v-if="!ifLogin">
          登录/注册
        </div>
        <el-dropdown @command="handleCommand" v-else>
          <div class="user el-dropdown-link">
            <div class="avatar">
              <img :src="userInfo.headPortrait" alt="" />
            </div>
            <div class="userName">{{ userInfo.name }}</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/api/user.js";

export default {
  data() {
    return {
      ifLogin: false,
      idx: 0,
      tabs: [
        {
          // title: "编辑推荐",
          title: "首页",
          route: "/index",
        },
        {
          // title: "最新课程",
          title: "讨论区",
          route: "/discuss",
        },
        {
          // title: "最热课程",
          title: "课程",
          route: "/course",
        },
      ],
      userInfo: {},
    };
  },
  props: ["ifIndex"],
  computed: {
    listenIsChangeAvatar() {
      return this.$store.state.isChangeAvatar;
    },
  },
  watch: {
    ifLogin(val) {
      if (val) this.fetchUserInfo();
    },
    listenIsChangeAvatar(val) {
      if (val) {
        this.fetchUserInfo();
        this.$store.commit("changeAvatarFinish");
      }
    },
  },
  methods: {
    tabsClick(route, index) {
      this.idx = index;
      this.$router.push(route);
    },
    toUser() {
      this.$router.push("/user");
    },
    handleCommand(command) {
      if (command == "logout") {
        localStorage.clear();
        this.ifLogin = false;
        if (this.$route.name == "home") this.$router.push("/user");
        this.$message.success("退出成功");
      } else {
        this.$router.push("/home");
      }
    },
    toIndex() {
      this.$router.push("/index");
    },
    async fetchUserInfo() {
      let res = await userService.getUserInfo();
      if (res.success) this.userInfo = res.userInfo;
      else this.$message.error(res.message);
    },
  },
  created() {
    this.ifLogin = sessionStorage.getItem("ifLogin");
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 64px;
  background-color: rgb(63, 63, 63);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;

  .left-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      user-select: none;
      cursor: pointer;
      width: 140px;
      margin-right: 30px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: inherit;
      background-color: rgba(255, 255, 255, 0.458823529411765);
      border: none;
      border-radius: 4px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      font-size: 12px;
      color: #ffffff;
    }

    .tabs-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tab {
        user-select: none;
        width: 104px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.447058823529412);
      }
    }
  }

  .right-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 180px;

    .btn {
      user-select: none;
      cursor: pointer;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.447058823529412);
    }

    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100px;
      cursor: pointer;

      .avatar {
        border-width: 0px;
        width: 32px;
        height: 32px;
        background-color: rgba(255, 255, 255, 0.458823529411765);
        border: none;
        border-radius: 50%;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        font-size: 18px;
        color: #ffffff;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .userName {
        font-family: "Microsoft YaHei";
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.447058823529412);
        text-align: left;
        overflow: hidden;
        width: 60px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

span:hover {
  cursor: pointer;
  color: #fff !important;
}

.selected {
  color: #fff !important;
}
</style>

<style>
.el-dropdown-menu__item {
  width: 100px;
}
</style>
