import { GET, POST } from './ZFHttp'

class HttpService  {
    // 获取最热课程
    getHot() {
        return GET('/course/getHot').then(res => res)
    }
}
const httpService = new HttpService();

export default httpService; 