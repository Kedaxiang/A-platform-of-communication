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
    getAll(query) {
        return GET('/api/course/getAll', query)
    }
    // 获取课程详情
    getCourseDetail(id) {
        return GET(`/api/course/getDetail/${id}`)
    }
    // 搜索课程
    searchCourse(name) {
        return GET('/api/course/search', name)
    }
    // 获取轮播图
    getCarousel() {
        return GET('/api/slideShow/getShow')
    }
}
const courseService = new CourseService();

export default courseService; 