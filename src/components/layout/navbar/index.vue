<template>
    <div class="navbar-wrapper flex items-center">
        <!-- todo: 切换按钮 -->
        <ul class="w-full list-none flex flex-row-reverse items-center">
            <!-- UI设置 -->
            <li @click="openUISettings">
                <el-icon>
                    <Setting />
                </el-icon>
            </li>
            <!-- 用户头像，昵称 -->
            <li style="padding: 0;">
                <el-dropdown @command="handleCommand" class="w-full h-full px-2.5 border-none" trigger="click">
                    <div class="flex">
                        <div class="flex items-center"> <img :src="userAvatar" /></div>
                        <div class="flex items-center ml-2">Re.Admin</div>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="signOut">退出系统</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </li>
            <!-- 待办事项 -->
            <li>
                <el-icon>
                    <Bell />
                </el-icon>
            </li>
            <!-- 全屏 -->
            <li @click="toggleFullScreen">
                <el-icon>
                    <FullScreen />
                </el-icon>
            </li>
            <!-- 搜索 -->
            <li>
                <el-icon>
                    <Search />
                </el-icon>
            </li>
        </ul>
        <ui-settings v-model="drawerVisible" />
    </div>
</template>

<script setup lang="ts">
import "./index.styl"
import userAvatar from "@/assets/img/user.jpeg"
import UiSettings from "@/components/layout/ui-settings/index.vue"
import { ref } from "vue";

const drawerVisible = ref<boolean>(false)
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
            break;
        default:
            break;
    }
}
// 打开UI设置抽屉
const openUISettings = () => {
    drawerVisible.value = true
}
</script>