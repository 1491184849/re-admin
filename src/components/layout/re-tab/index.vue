<template>
  <div class="re-tab-wrapper flex justify-between" ref="tabRef">
    <!-- 菜单标签 -->
    <div class="h-full flex items-center">
      <el-tag class="mr-2" @click="jumpPage({ id: '', path: '/', title: '' })"
        :type="getActiveType(['/', '/home'])">首页</el-tag>
      <el-tag closable class="mr-2" v-for="v in computedTabs" :key="v.id" @close="(e: any) => closeTab(e, v.id)"
        @click="jumpPage(v)" :type="getActiveType([v.path])">
        {{ v.title }}
      </el-tag>
    </div>
    <!-- 操作按钮 -->
    <div class="h-full flex items-center">
      <div class="flex items-center">
        <el-button link icon="ArrowLeft" :disabled="startTabIndex <= 0" @click="leftMoveShowTab"></el-button>
        <el-divider direction="vertical" />
      </div>
      <div class="flex items-center">
        <el-button link icon="ArrowRight" :disabled="!tabs || endTabIndex + 1 >= tabs.length"
          @click="rightMoveShowTab"></el-button>
        <el-divider direction="vertical" />
      </div>
      <el-button link icon="Refresh" @click="doRefresh"></el-button>
      <el-divider direction="vertical" />
      <el-dropdown @command="handleCommand" trigger="click">
        <el-button link icon="ArrowDown"></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeCurrent">关闭当前标签页</el-dropdown-item>
            <el-dropdown-item command="closeLeft">关闭左侧标签页</el-dropdown-item>
            <el-dropdown-item command="closeRight">关闭右侧标签页</el-dropdown-item>
            <el-dropdown-item command="closeOther">关闭其它标签页</el-dropdown-item>
            <el-dropdown-item command="closeAll" divided>关闭全部标签页</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./index.styl";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { CloseTabType, TabModel } from "@/store/tabStore";
import { useTabManager } from "@/hooks/useTabManager";

const tabManager = useTabManager();
const tabs = ref<TabModel[]>();
const router = useRouter();
const tabWrapperWidth = ref<number>();
const startTabIndex = ref<number>(0);
const endTabIndex = ref<number>(0);
const maxShowTabLength = ref<number>(0);
const tabRef = ref<Element>();
const route = useRoute();
// dropdown下拉选择
const handleCommand = (cmd: string) => {
  switch (cmd) {
    case "closeCurrent":
      tabManager.close(CloseTabType.CURRENT);
      break;
    case "closeLeft":
      tabManager.close(CloseTabType.LEFT);
      break;
    case "closeRight":
      tabManager.close(CloseTabType.RIGHT);
      break;
    case "closeOther":
      tabManager.close(CloseTabType.OTHERS);
      break;
    case "closeAll":
      tabManager.close(CloseTabType.ALL);
      break;
  }
};
const jumpPage = (v: TabModel) => {
  tabManager.setActive(v);
};
const closeTab = (_: any, id: string) => {
  tabManager.close(CloseTabType.TARGET, id);
};
const leftMoveShowTab = () => { };
const rightMoveShowTab = () => { };
const doRefresh = () => {
  window.location.reload();
};
/**
 *  一个字12px，关闭图标12px，内填充14px，字和关闭图标间距6px，右间距8px = n*12+40
 * 侧边栏占200px，首页标签占44px，固定操作按钮（单个图标+分割线占37px）占131px，两端内填充30px
 * @param arr
 * @param val re-tab-wrapper宽度
 */
const updateShowTabByWidth = (
  arr: RouteRecordRaw[] | undefined,
  val: number
) => {
  if (!arr || arr.length === 0) {
    return;
  }
  const blankWidth = val - 205;
  let dynamicTabWidth = 0;
  let len = arr.length;
  for (let i = 0; i < arr.length; i++) {
    let titleLen = 64;
    if (arr[i].meta?.title instanceof String) {
      titleLen = (arr[i].meta?.title as string).length;
    }
    dynamicTabWidth += titleLen * 12 + 40;
    if (dynamicTabWidth > blankWidth) {
      len = i;
      break;
    }
  }
  maxShowTabLength.value = len;
  endTabIndex.value = startTabIndex.value + len - 1;
};
watch(
  () => tabWrapperWidth.value,
  (val) => { }
);
const computedTabs = computed((): TabModel[] => {
  console.log(tabManager.getDisplayTabs());
  return tabManager.getDisplayTabs();
});
const getActiveType = (path: string[]): string => {
  for (let i = 0; i < path.length; i++) {
    if (path[i] === route.path) {
      return "primary";
    }
  }
  return "info";
};
const addTab = () => { };
const showCurrentRouteTab = () => {
  const currentRoute = router.getRoutes().find((x) => x.path === route.path);
  if (
    currentRoute &&
    currentRoute.path != "/" &&
    currentRoute.path != "/home"
  ) {
    localStorage.setItem("active-route", JSON.stringify(currentRoute));
  }
};
const beforeunloadHandler = (_: any) => {
  showCurrentRouteTab();
};
const unloadHandler = (_: any) => {
  showCurrentRouteTab();
};
defineExpose({
  addTab,
});
onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    // 处理大小变化的回调函数
    for (const entry of entries) {
      tabWrapperWidth.value = entry.target.clientWidth;
    }
  });
  resizeObserver.observe(tabRef.value!);
  window.addEventListener("beforeunload", (e) => beforeunloadHandler(e));
  window.addEventListener("unload", (e) => unloadHandler(e));
  //挂当前路由
  const str = localStorage.getItem("active-route");
  if (str) {
    const currentRoute = JSON.parse(str);
    if (currentRoute && route.path !== "/" && route.path !== "/home") {
      tabs.value?.push(currentRoute);
    }
  }
});
onUnmounted(() => {
  window.removeEventListener("beforeunload", (e) => beforeunloadHandler(e));
  window.removeEventListener("unload", (e) => unloadHandler(e));
});
</script>