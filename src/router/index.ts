import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import Home from "@/views/home/index.vue";

const routes: RouteRecordRaw[] = [
  { path: "/login", component: Login },
  {
    path: "/",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
