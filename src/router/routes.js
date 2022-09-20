const routes = [
  {
    path: "/",
    component: () => import("pages/construction_page.vue"), // 施工页面
  },
  {
    path: "/index",
    component: () => import("pages/IndexPage.vue"), // 地图首页
  },
];

export default routes;
