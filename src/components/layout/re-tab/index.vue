<template>
  <div class="re-tab-wrapper flex justify-between" ref="tabRef">
    <!-- 菜单标签 -->
    <div class="h-full flex items-center">
      <el-tag class="mr-2" @click="jumpPage('/')" :type="getActiveType(['/','/home'])">首页</el-tag>
      <el-tag closable class="mr-2" v-for="(v,i) in computedTabs" :key="i" @close="(e: any) => closeTab(e, v.path)"
              @click="jumpPage(v.path)" :type="getActiveType([v.path])">
        {{ v.meta?.title }}
      </el-tag>
    </div>
    <!-- 操作按钮 -->
    <div class="h-full flex items-center">
      <div class="flex items-center">
        <el-button link icon="ArrowLeft" :disabled="startTabIndex <= 0" @click="leftMoveShowTab"></el-button>
        <el-divider direction="vertical"/>
      </div>
      <div class="flex items-center">
        <el-button link icon="ArrowRight" :disabled="!tabs || endTabIndex + 1 >= tabs.length"
                   @click="rightMoveShowTab"></el-button>
        <el-divider direction="vertical"/>
      </div>
      <el-button link icon="Refresh" @click="doRefresh"></el-button>
      <el-divider direction="vertical"/>
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
import "./index.styl"
import {RouteRecordRaw, useRoute, useRouter} from 'vue-router'
import {ref, watch, onMounted, computed, onUnmounted} from 'vue'
import {useStore} from "vuex";

const tabs = defineModel<RouteRecordRaw[]>()
const router = useRouter()
const tabWrapperWidth = ref<number>()
const startTabIndex = ref<number>(0)
const endTabIndex = ref<number>(0)
const maxShowTabLength = ref<number>(0)
const tabRef = ref<Element>()
const route = useRoute();
const store = useStore();
// dropdown下拉选择
const handleCommand = (cmd: string) => {
  const currentIndex = tabs.value?.findIndex(x => x.path === route.path)!;
  if (currentIndex < 0) return;
  switch (cmd) {
    case "closeCurrent":
      closeTab(null, route.path);
      break;
    case "closeLeft":
      tabs.value?.splice(0, currentIndex);
      break;
    case "closeRight":
      const tabLength = tabs.value!.length;
      console.log(tabLength, currentIndex)
      tabs.value?.splice(currentIndex + 1, tabLength - currentIndex + 1);
      break;
    case "closeOther":
      tabs.value = [tabs.value![currentIndex]]
      break;
    case "closeAll":
      tabs.value = [];
      router.replace('/');
      break;
  }
}
const jumpPage = (path: string) => {
  router.push(path)
}
const closeTab = (_: any, path: string) => {
  const i = tabs.value?.findIndex(x => x.path === path)!;
  //如果是活动标签，退回上一个
  if (route.path === tabs.value![i].path) {
    if (i >= 1) {
      router.push(tabs.value![i - 1].path);
    } else if (i === 0) {
      router.push("/home");
    }
  }
  tabs?.value?.splice(i, 1);
  endTabIndex.value -= 1;
  if (startTabIndex.value >= 1 && endTabIndex.value - startTabIndex.value < maxShowTabLength.value) {
    startTabIndex.value -= 1;
  }
}
const leftMoveShowTab = () => {
  startTabIndex.value -= 1
  endTabIndex.value -= 1
}
const rightMoveShowTab = () => {
  startTabIndex.value += 1
  endTabIndex.value += 1
  updateShowTabByWidth(computedTabs.value, tabWrapperWidth.value!)
}
const doRefresh = () => {
  window.location.reload()
}
/**
 *  一个字12px，关闭图标12px，内填充14px，字和关闭图标间距6px，右间距8px = n*12+40
 * 侧边栏占200px，首页标签占44px，固定操作按钮（单个图标+分割线占37px）占131px，两端内填充30px
 * @param arr
 * @param val re-tab-wrapper宽度
 */
const updateShowTabByWidth = (arr: RouteRecordRaw[] | undefined, val: number) => {
  if (!arr || arr.length === 0) {
    return;
  }
  const blankWidth = val - 205;
  let dynamicTabWidth = 0;
  let len = arr.length
  for (let i = 0; i < arr.length; i++) {
    dynamicTabWidth += arr[i].meta?.title!.length * 12 + 40
    if (dynamicTabWidth > blankWidth) {
      len = i;
      break;
    }
  }
  maxShowTabLength.value = len
  endTabIndex.value = startTabIndex.value + len - 1
}
watch(() => tabWrapperWidth.value, (val) => {
  updateShowTabByWidth(tabs?.value, val!);
})
const computedTabs = computed((): RouteRecordRaw[] => {
  return tabs?.value?.slice(startTabIndex.value, endTabIndex.value + 1)!;
})
const getActiveType = (path: string[]): string => {
  for (let i = 0; i < path.length; i++) {
    if (path[i] === route.path) {
      return "primary";
    }
  }
  return "info";
}
const addTab = () => {
  if (endTabIndex.value <= 0) {
    endTabIndex.value = tabs.value?.length! - 1;
  } else {
    updateShowTabByWidth(tabs.value, tabWrapperWidth.value!);
    //活动标签是否显示，未显示更改起止索引
    const activeIndex = tabs.value?.findIndex(x => x.path === route.path)! + 1;
    if (activeIndex > endTabIndex.value) {
      endTabIndex.value = activeIndex;
      startTabIndex.value = endTabIndex.value - maxShowTabLength.value + 1;
    }
  }
}
const showCurrentRouteTab = () => {
  const currentRoute = router.getRoutes().find(x => x.path === route.path);
  if (currentRoute) {
    store.state.reTabStore.commit('setActiveRoute', currentRoute);
    tabs.value = [currentRoute];
  }
}
const beforeunloadHandler = (_: any) => {
  showCurrentRouteTab();
};
const unloadHandler = (_: any) => {
  showCurrentRouteTab();
};
defineExpose({
  addTab
})
onMounted(() => {
  const resizeObserver = new ResizeObserver(entries => {
    // 处理大小变化的回调函数
    for (const entry of entries) {
      tabWrapperWidth.value = entry.target.clientWidth
    }
  });
  resizeObserver.observe(tabRef.value!);
  window.addEventListener("beforeunload", (e) => beforeunloadHandler(e));
  window.addEventListener("unload", (e) => unloadHandler(e));
  console.log(store.state.reTabStore.activeRoute)
})
onUnmounted(() => {
  window.removeEventListener("beforeunload", (e) => beforeunloadHandler(e));
  window.removeEventListener("unload", (e) => unloadHandler(e));
})
</script>