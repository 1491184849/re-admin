<template>
    <div class="re-tab-wrapper flex justify-between" ref="tabRef">
        <!-- 菜单标签 -->
        <div class="h-full flex items-center">
            <el-tag class="mr-2" @click="jumpPage('/')">首页</el-tag>
            <el-tag closable class="mr-2" v-for="v, i in computedTabs" :key="i" @close="(e: any) => closeTab(e, i)">
                {{ v }}
            </el-tag>
        </div>
        <!-- 操作按钮 -->
        <div class="h-full flex items-center">
            <div class="flex items-center">
                <el-button link icon="ArrowLeft" :disabled="startTabIndex <= 0" @click="leftMoveShowTab"></el-button>
                <el-divider direction="vertical" />
            </div>
            <div class="flex items-center">
                <el-button link icon="ArrowRight" :disabled="endTabIndex + 1 >= tabs.length"
                    @click="rightMoveShowTab"></el-button>
                <el-divider direction="vertical" />
            </div>
            <el-button link icon="Refresh" @click="doRefresh"></el-button>
            <el-divider direction="vertical" />
            <el-dropdown @command="handleCommand" trigger="click">
                <el-button link icon="ArrowDown"></el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeCurrent">关闭标签页</el-dropdown-item>
                        <el-dropdown-item command="closeLeft">关闭左侧标签页</el-dropdown-item>
                        <el-dropdown-item command="closeRigth">关闭右侧标签页</el-dropdown-item>
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
import { useRouter } from 'vue-router'
import { ref, watch, onMounted, computed } from 'vue'

const tabs = ref<string[]>([])
const router = useRouter()
const tabWrapperWidth = ref<number>()
const startTabIndex = ref<number>(0)
const endTabIndex = ref<number>(0)
const maxShowTabLength = ref<number>(0)
const tabRef = ref<Element>()
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
const closeTab = (_: any, i: number) => {
    tabs.value.splice(i, 1)
}
const leftMoveShowTab = () => {
    startTabIndex.value -= 1
    endTabIndex.value -= 1
    updateShowTabByWidth(computedTabs.value, tabWrapperWidth.value!)
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
 * @param val re-tab-wrapper宽度
*/
const updateShowTabByWidth = (arr: string[], val: number) => {
    const blankWidth = val - 205;
    let dynamicTabWidth = 0;
    let len = arr.length
    for (let i = 0; i < arr.length; i++) {
        dynamicTabWidth += arr[i].length * 12 + 40
        if (dynamicTabWidth > blankWidth) {
            len = i;
            break;
        }
    }
    maxShowTabLength.value = len
    endTabIndex.value = startTabIndex.value + len - 1
}
watch(() => tabWrapperWidth.value, (val) => {
    updateShowTabByWidth(tabs.value, val!);
})
const computedTabs = computed(() => {
    return tabs.value.slice(startTabIndex.value, endTabIndex.value + 1);
})
onMounted(() => {
    for (let i = 0; i < 24; i++) {
        tabs.value.push("标签" + i);
    }
    const resizeObserver = new ResizeObserver(entries => {
        // 处理大小变化的回调函数
        for (const entry of entries) {
            tabWrapperWidth.value = entry.target.clientWidth
        }
    });
    resizeObserver.observe(tabRef.value!);
})
</script>