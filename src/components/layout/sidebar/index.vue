<template>
  <div class="sidebar-wrapper">
    <div class="system-title">
      <a class="flex justify-center items-center text-white w-full h-full" href="/">
        <img :src="VueLogo" class="mr-2" alt="logo" />
        <span v-if="!model" class="font-bold">Re-Admin</span>
      </a>
    </div>
    <el-menu :default-active="computedActivePath" active-text-color="#ffffff" background-color="#17253b" text-color="#7c859f"
      class="custom-el-menu" :collapse="model" @select="menuSelected">
      <sidebar-item v-if="menus" v-for="(item, index) in menus" :key="index" :item="item" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { RouteRecordRaw } from "vue-router";
import { useRouteCache } from '@/router/hook';
import './index.styl'
import SidebarItem from './sidebar-item.vue'
import VueLogo from "@/assets/vue.svg"
import { useTabManager } from '@/hooks/useTabManager';

const model = defineModel()
const menus = ref<RouteRecordRaw[] | undefined>([])
const routesCache = useRouteCache();
const tabManager = useTabManager();
const emits = defineEmits<{
  (e: "menu-selected", item: RouteRecordRaw): any
}>()
const menuSelected = (index: string) => {
  if (index === "/" || index === "/home") {
    return;
  }
  tabManager.append(index);
};
onMounted(() => {
  const rawRoutes = routesCache.getCache();
  menus.value = rawRoutes?.find(x => x.path === "/")?.children?.filter(x => !x.meta?.hidden);
})
const computedActivePath = computed((): string => {
  return tabManager.getActiveItem()?.path ?? '/home';
});
// 监听收缩状态
watch(() => model.value, (val) => {
  const elMenuDom = document.querySelector(".custom-el-menu")
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