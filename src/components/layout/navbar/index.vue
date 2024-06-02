<template>
  <div class="navbar-wrapper flex items-center">
    <!-- 侧边菜单收缩切换按钮 -->
    <div class="btn-toggle-wrapper h-full" @click="toggleSidebar">
      <span class="btn-toggle">
        <re-icon v-if="collapse" name="ant-design:menu-unfold-outlined" />
        <re-icon v-else name="ant-design:menu-fold-outlined" />
      </span>
    </div>
    <ul class="w-full list-none flex flex-row-reverse items-center">
      <!-- 用户头像，昵称 -->
      <li style="padding: 0;">
        <el-dropdown @command="handleCommand" class="w-full h-full px-2.5 border-none" trigger="click">
          <div class="flex">
            <div class="flex items-center"><img :src="UserAvatar" alt="头像" /></div>
            <div class="flex items-center ml-2">admin</div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="baseInfo">基本资料</el-dropdown-item>
              <el-dropdown-item command="signOut">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <!-- 全屏 -->
      <li @click="toggleFullScreen">
        <el-tooltip content="全屏">
          <el-icon>
            <FullScreen />
          </el-icon>
        </el-tooltip>
      </li>
      <!-- 搜索 -->
      <li>
        <el-tooltip content="搜索">
          <re-icon name="Search" />
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import "./index.styl"
import UserAvatar from "@/assets/img/user.jpeg"
import ReIcon from '@/components/re-icon/index.vue'
import { useRouter } from "vue-router"
import { onMounted, ref, watch } from "vue";
import { useTabManager } from "@/hooks/useTabManager";

const tabManager = useTabManager();
const collapse = ref<boolean>(false);
const emits = defineEmits(['changeSidebarStatus'])
const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
const router = useRouter();
// 切换全屏
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
// dropdown下拉选择
const handleCommand = (cmd: string) => {
  switch (cmd) {
    case "signOut":
      router.replace("/login")
      break;
    case "baseInfo":
      const personRoute = router.getRoutes().find(x => x.path === '/person');
      if (personRoute) {
        tabManager.append('/person');
      }
      break;
    default:
      break;
  }
}
// 切换侧边栏
const toggleSidebar = () => {
  collapse.value = !collapse.value;
  emits("changeSidebarStatus", collapse.value)
}

onMounted(() => {
  // 内置函数监听窗口变化
  window.onresize = () => {
    return (() => {
      screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    })()
  }
})
// 监听窗口宽度，小于1024px自动收缩侧边栏
watch(() => screenWidth.value, (val) => {
  collapse.value = val < 1024;
  emits("changeSidebarStatus", collapse.value)
})
</script>