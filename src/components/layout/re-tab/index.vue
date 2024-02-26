<template>
    <div class="re-tab-wrapper flex justify-between">
        <!-- 菜单标签 -->
        <div class="h-full flex items-center">
            <el-tag class="mr-2" @click="jumpPage('/')">首页</el-tag>
            <el-tag closable class="mr-2" v-for="v, i in computedTabs" :key="i">
                {{ v }}
            </el-tag>
        </div>
        <!-- 操作按钮 -->
        <div class="h-full flex items-center">
            <el-button link icon="Refresh"></el-button>
            <el-divider direction="vertical" />
            <el-dropdown @command="handleCommand" trigger="click">
                <el-button link icon="ArrowDown"></el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="signOut">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import "./index.styl"
import { useRouter } from 'vue-router'
import { ref, watch, onMounted, computed } from 'vue'

const tabs = ref<string[]>([])
const router = useRouter()
const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
const maxShowTabLength = ref<number>(0)
// dropdown下拉选择
const handleCommand = (cmd: string) => {
    switch (cmd) {
        case "signOut":
            break;
        default:
            break;
    }
}
const jumpPage = (path: string) => {
    router.push(path)
}
/**
 *  一个字12px，关闭图标12px，内填充14px，字和关闭图标间距10px，再多算1px = 36+n*12+1
 * 首页标签占44px
*/
watch(() => screenWidth.value, (_) => {
    const width = (document.querySelector(".re-tab-wrapper") as HTMLElement).style.width
    debugger
    const blankWidth = width - 244;
    let dynamicTabWidth = 0;
    for (let i = 0; i < tabs.value.length; i++) {
        dynamicTabWidth += 36 + tabs.value[i].length * 12 + 1
        if (dynamicTabWidth > blankWidth) {
            maxShowTabLength.value = i
            return;
        }
    }
    maxShowTabLength.value = tabs.value.length
})
const computedTabs = computed(() => {
    console.log(maxShowTabLength.value)
    return tabs.value.slice(0, maxShowTabLength.value);
})
onMounted(() => {
    for (let i = 0; i < 24; i++) {
        tabs.value.push("标签" + i);
    }
    // 内置函数监听窗口变化
    window.onresize = () => {
        return (() => {
            screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        })()
    }
})
</script>