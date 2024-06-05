import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import Layout from "@/components/layout/index.vue";
import Home from "@/views/home/index.vue";
import Person from "@/views/person/index.vue";
import { MenuItem, getSidebarMenus } from "@/api/menu";
import { useRouteCache } from "./hook";
import { HOME_PATH } from "@/consts";
import { useAuthorization } from "@/hooks/useAuthorization";

// views下页面
const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");
// 固定路由
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    redirect: HOME_PATH,
    children: [
      {
        path: HOME_PATH,
        component: Home,
        meta: {
          title: "首页",
          icon: "ic:round-home",
        },
      },
      {
        path: "/auth",
        meta: {
          title: "权限控制",
          icon: "mingcute:safe-lock-line",
        },
        component: () => import("@/views/auth/index.vue"),
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
        path: "/errors",
        meta: {
          title: "错误页面",
          icon: "material-symbols:error",
        },
        children: [
          {
            path: "/errors/403",
            name: "err403",
            meta: {
              title: "403(禁止访问)",
            },
            component: () => import("@/views/errors/403.vue"),
          },
          {
            path: "/errors/500",
            name: "err500",
            meta: {
              title: "500(服务器错误)",
            },
            component: () => import("@/views/errors/500.vue"),
          },
        ],
      },
      {
        path: "/person",
        component: Person,
        meta: {
          title: "基本资料",
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
        roles: item?.meta?.roles,
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

router.beforeEach((to, _) => {
  console.log(to);
  const userAuth = useAuthorization();
  //未登录或token过期
  if (!userAuth.isAuthenticated() && to.name !== "Login") {
    return { name: "Login" };
  } else if (to.meta?.roles) {
    const needRoles = to.meta?.roles as string[];
    //无角色权限
    if (!userAuth.isInRole(needRoles)) {
      return { name: "err403" };
    }
  }
  return true;
});

export default router;
