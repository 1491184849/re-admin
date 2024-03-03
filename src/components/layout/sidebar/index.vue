<template>
  <div class="sidebar-wrapper">
    <div class="system-title">
      <a class="flex justify-center items-center text-white w-full h-full" href="/">
        <img :src="VueLogo" class="mr-2" />
        <span v-if="!model" class="font-bold">Re-Admin</span>
      </a>
    </div>
    <el-menu default-active="2" active-text-color="#ffffff" background-color="#17253b" text-color="#7c859f"
      @open="handleOpen" @close="handleClose" class="custom-el-emnu" router :collapse="model">
      <sidebar-item v-if="menus" v-for="(item, index) in menus" :key="index" :item="item" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { RouteRecordRaw } from "vue-router";
import { useRouteCache } from '@/router/hook';
import './index.styl'
import SidebarItem from './sidebar-item.vue'
import VueLogo from "@/assets/vue.svg"

const model = defineModel()
const menus = ref<RouteRecordRaw[] | undefined>([])
const routesCache = useRouteCache();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
onMounted(() => {
  const rawRoutes = routesCache.getCache();
  menus.value = rawRoutes?.find(x => x.path === "/")?.children?.filter(x => !x.meta?.hidden);
})
// 监听收缩状态
watch(() => model.value, (val) => {
  const elMenuDom = document.querySelector(".custom-el-emnu")
  if (!elMenuDom) return;
  // true收缩，false展开
  if (val) {
    document.querySelector(".el-aside")?.classList?.add("re-el-menu--collapse");
    document.querySelector(".el-header")?.classList?.add("re-el-header-width");
    document.querySelector(".re-tab-wrapper")?.classList?.add("re-el-header-width");
  } else {
    document.querySelector(".el-aside")?.classList?.remove("re-el-menu--collapse");
    document.querySelector(".el-header")?.classList?.remove("re-el-header-width");
    document.querySelector(".re-tab-wrapper")?.classList?.remove("re-el-header-width");
  }
})
</script>