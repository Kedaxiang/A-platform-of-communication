import { GET, POST } from './server'

class UserService  {
  // 用户注册
  register(data) {
    return POST('/api/user/register', data).then(res => res)
  }
  // 用户注册获取验证码
  getRegVerifyCode(data) {
    return GET('/api/user/getRegVerifyCode', data)
  }
  // 用户使用手机号登录
  phoneLogin(data) {
    return POST('/api/user/phoneLogin', {}, data).then(res => res)
  }
  // 用户使用账号密码登录
  pwdLogin(data) {
    return POST('/api/user/pwdLogin', {}, data).then(res => res)
  }
  // 用户登录/改密获取手机验证码
  getVerifyCode(data) {
    return GET('/api/user/getVerifyCode', data)
  }

}
const userService = new UserService();

export default userService;