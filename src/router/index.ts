import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import Layout from "@/components/layout/index.vue";
import Home from "@/views/home/index.vue";
import Person from "@/views/person/index.vue";
import { MenuItem, getSidebarMenus } from "@/api/menu";

// views下页面
const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");
// 固定路由
const routes: RouteRecordRaw[] = [
  { path: "/login", component: Login },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: Home,
      },
      { path: "/person", component: Person },
    ],
  },
];
// 生成路由：由动态数据"MenuItem[]"=>"RouteRecordRaw[]"
const genRoutes = (array: MenuItem[]): RouteRecordRaw[] => {
  const modulesRoutesKeys = Object.keys(modulesRoutes);
  const dynamicRoutes: RouteRecordRaw[] = [];
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    const routeIndex = modulesRoutesKeys.findIndex((mr) =>
      mr.includes(item.path + "/index.vue")
    );
    const r: RouteRecordRaw = {
      path: item.path,
      name: item.name,
      meta: {
        title: item.title,
        auth: item?.meta?.auth,
      },
      children: [],
    };
    if (!item.children || item.children.length === 0) {
      if (routeIndex !== -1) {
        r.component = modulesRoutes[modulesRoutesKeys[routeIndex]];
      }
    } else {
      r.children = genRoutes(item.children);
    }
    dynamicRoutes.push(r);
  }
  return dynamicRoutes;
};

// 合并固定路由、动态路由
const mergeRoutes = async (): Promise<RouteRecordRaw[]> => {
  const allRoutes = [...routes];
  try {
    const { data } = await getSidebarMenus();
    const asyncRoutes = genRoutes(data);
    const layoutRouteIndex = allRoutes.findIndex((x) => x.path === "/");
    if (layoutRouteIndex !== -1) {
      allRoutes[layoutRouteIndex].children = [
        ...allRoutes[layoutRouteIndex].children!,
        ...asyncRoutes,
      ];
    }
  } catch (error) {
    console.error("合并路由错误：", error);
  }
  return allRoutes;
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: await mergeRoutes(),
});

export default router;
