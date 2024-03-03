import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import Layout from "@/components/layout/index.vue";
import Home from "@/views/home/index.vue";
import Person from "@/views/person/index.vue";
import { MenuItem, getSidebarMenus } from "@/api/menu";
import { useRouteCache } from "./hook";

// views下页面
const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");
// 固定路由
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: Home,
        meta: {
          title: "首页",
          icon: "ic:round-home",
        },
      },
      {
        path: "/table",
        meta: {
          title: "智能表格",
          icon: "material-symbols:table-sharp",
        },
        component: () => import("@/views/table/index.vue"),
      },
      {
        path: "/login-pages",
        meta: {
          title: "登录页面",
          icon: "icon-park-outline:hanfu-chinese-style",
        },
        children: [
          {
            path: "/login-pages/one",
            meta: {
              title: "登录-1",
            },
            component: () => import("@/views/login-pages/one/index.vue"),
          },
          {
            path: "/login-pages/two",
            meta: {
              title: "登录-2",
            },
            component: () => import("@/views/login-pages/two/index.vue"),
          },
          {
            path: "/login-pages/three",
            meta: {
              title: "登录-3",
            },
            component: () => import("@/views/login-pages/three/index.vue"),
          },
        ],
      },
      {
        path: "/errors",
        meta: {
          title: "错误页面",
          icon: "material-symbols:error",
        },
        children: [
          {
            path: "/errors/401",
            meta: {
              title: "401(未登录)",
            },
            component: () => import("@/views/errors/401.vue"),
          },
          {
            path: "/errors/403",
            meta: {
              title: "403(禁止访问)",
            },
            component: () => import("@/views/errors/403.vue"),
          },
          {
            path: "/errors/500",
            meta: {
              title: "500(服务器错误)",
            },
            component: () => import("@/views/errors/403.vue"),
          },
        ],
      },
      {
        path: "/person",
        component: Person,
        meta: {
          hidden: true,
        },
      },
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
        title: item?.meta?.title,
        icon: item?.meta?.icon,
        auths: item?.meta?.auths,
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
  useRouteCache().setCache(allRoutes);
  return allRoutes;
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: await mergeRoutes(),
});

export default router;
