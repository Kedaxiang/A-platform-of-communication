<template>
  <div class="box">
    <div class="wall-wrap">
      <div class="logo">
        <img src="~@/assets/img/logo.svg" alt="">
        <div class="title">
          GDUT Elearning
        </div>
      </div>
      <div class="text">GDUT Elearning是为gdut学生服务的在线学习平台</div>
      <div class="switch-nav">
        <a 
          v-for="(item, index) in tabs" 
          :key="index"  
          :href="item.path" 
          :id="item.text == '注册' ? 'register' : ''"
          :class="index === curIndex ? 'cur' : ''"
          @click="switchTab(index)">
          {{item.text}}
        </a>
      </div>
      <div class="form">
        <!-- 账号密码登录 -->
        <AccountLogin v-if="curIndex == 0"/>
        <!-- 手机号登录 -->
        <PhoneLogin v-if="curIndex == 1"/>
        <!-- 注册 -->
        <Register v-if="curIndex == 2"/>
      </div>
    </div>
  </div>
</template>

<script>
import AccountLogin from "./account-login"
import PhoneLogin from "./phone-login"
import Register from './register'

export default {
  data() {
    return {
      curIndex: 0,
      tabs: [
        {
          path: '#account',
          text: '账号登录'
        },
        {
          path: '#phone',
          text: '手机号登录'
        },
        {
          path: '#register',
          text: '注册'
        }
      ]
    }
  },
  methods: {
    switchTab(index) {
      this.curIndex = index;
    },
  },
  components: { AccountLogin, PhoneLogin, Register }
}
</script>

<style lang="less" scoped>
  .box {
    background: url("../../assets/img/bcg.jpg") no-repeat;
    background-size: cover;
    height: 100%;

    .wall-wrap {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -315px;
      margin-left: -200px;
      width: 400px;
      height: 630px;
      background: #FFFFFF;
      box-shadow: 0 0 10px 0 rgba(0,33,79,0.11);
      border-radius: 6px;
      padding: 20px 0;

      .logo {
        margin: auto;
        display: flex;
        width: 60%;
        justify-content: space-around;
        align-items: center;

        img {
          width: 62px;
          height: 70px;
        }

        .title {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.427450980392157);
          line-height: 24px;
        }
      }

      .text {
        margin: 15px;
        text-align: center;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.427450980392157);
        line-height: 24px;
      }

      .switch-nav {
        margin-top: 20px;
        border-bottom: 1px solid #EDEDED;
        position: relative;
        height: 40px;
        text-align: center;

        .cur {
          font-weight: bold;
          font-size: 16px;
          color: #2A2A2A;
        }
        
        #register {
          margin-left: 100px;
          width: 50px;
        }

        a {
          text-decoration: none;
          width: 100px;
          height: 25px;
          line-height: 25px;
          font-size: 14px;
          color: #777;
          transition: all ease-in .2s;
          margin-left: 10px;
          text-align: center;
          float: left;
        }
      }

      .form {
        .form-box {
          width: 340px;
          margin: 20px auto;

          .btn-wrap {
            display: flex;
            height: 40px;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

            .btn {
              font-weight: 400;
              font-style: normal;
              color: #1890FF;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>