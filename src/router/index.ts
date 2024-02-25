import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import Layout from "@/components/layout/index.vue";
import Home from "@/views/home/index.vue";

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
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
