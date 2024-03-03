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
            <!-- UI设置 -->
            <li @click="openUISettings">
                <re-icon name="Setting" />
            </li>
            <!-- 用户头像，昵称 -->
            <li style="padding: 0;">
                <el-dropdown @command="handleCommand" class="w-full h-full px-2.5 border-none" trigger="click">
                    <div class="flex">
                        <div class="flex items-center"> <img :src="UserAvatar" /></div>
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
            <!-- 待办事项 -->
            <li>
                <re-icon name="Bell" />
            </li>
            <!-- 全屏 -->
            <li @click="toggleFullScreen">
                <el-icon>
                    <FullScreen />
                </el-icon>
            </li>
            <!-- 搜索 -->
            <li>
                <re-icon name="Search" />
            </li>
        </ul>
        <ui-settings v-model="drawerVisible" />
    </div>
</template>

<script setup lang="ts">
import "./index.styl"
import UserAvatar from "@/assets/img/user.jpeg"
import UiSettings from "@/components/layout/ui-settings/index.vue"
import ReIcon from '@/components/re-icon/index.vue'
import { useRouter } from "vue-router"
import { onMounted, ref, watch } from "vue";

const drawerVisible = ref<boolean>(false)
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
            router.push("/person")
            break;
        default:
            break;
    }
}
// 打开UI设置抽屉
const openUISettings = () => {
    drawerVisible.value = true
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
    if (val < 1024) {
        collapse.value = true
    } else {
        collapse.value = false
    }
    emits("changeSidebarStatus", collapse.value)
})
</script>