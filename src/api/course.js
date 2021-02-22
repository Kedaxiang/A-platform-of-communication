import { GET, POST } from './server'

class CourseService  {
    // 获取最热课程
    getHot() {
        return GET('/api/course/getHot')
    }
    // 获取最新课程
    getLatest() {
        return GET('/api/course/getLatest')
    }
    // 获取推荐课程
    getRecommend() {
        return GET('/api/course/getRecommend')
    }
    // 获取所有课程
    getAll() {
        return GET('/api/course/getAll')
    }
}
const courseService = new CourseService();

export default courseService; 