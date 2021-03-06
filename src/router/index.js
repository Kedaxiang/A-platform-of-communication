import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "index",
  },
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/index/index"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user/index"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index"),
  },
  {
    path: "/videoStudy",
    name: "videoStudy",
    component: () => import("@/views/video/index"),
  },
  {
    path: "/discuss",
    name: "discuss",
    component: () => import("@/views/discuss/index"),
  },
  {
    path: "/publish",
    name: "publish",
    component: () => import("@/views/discuss/publishPosts"),
  },
  {
    path: "/course",
    name: "course",
    component: () => import("@/views/course/index"),
  },
  {
    path: "/post",
    name: "post",
    component: () => import("@/views/discuss/post"),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
