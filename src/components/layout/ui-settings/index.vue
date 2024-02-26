<template>
    <el-drawer v-model="value" title="偏好设置" direction="rtl" size="300px" :before-close="handleClose">
        <div>
            <el-divider class="pb-5">主题配色</el-divider>
            <el-radio-group v-model="theme">
                <el-radio :label="1">默认</el-radio>
                <el-radio :label="2">暗黑</el-radio>
                <el-radio :label="3">绿色</el-radio>
                <el-radio :label="4">红色</el-radio>
                <el-radio :label="5">粉色</el-radio>
                <el-radio :label="6">紫色</el-radio>
            </el-radio-group>
        </div>
        <div class="pt-4">
            <el-divider class="pb-5">界面显示</el-divider>
            <div>
                <div class="flex justify-between mb-2">
                    <p class="flex items-center">侧边标题栏</p>
                    <div>
                        <el-switch v-model="uiShow.sidebarLogo" />
                    </div>
                </div>
                <div class="flex justify-between mb-2">
                    <p class="flex items-center">侧边栏收缩</p>
                    <div>
                        <el-switch v-model="uiShow.sidebarCanFold" />
                    </div>
                </div>
                <div class="flex justify-between mb-2">
                    <p class="flex items-center">开启面包屑</p>
                    <div>
                        <el-switch v-model="uiShow.breadcrumb" />
                    </div>
                </div>
                <div class="flex justify-between mb-2">
                    <p class="flex items-center">开启标签栏</p>
                    <div>
                        <el-switch v-model="uiShow.tagBar" />
                    </div>
                </div>
                <div class="flex justify-between mb-2">
                    <p class="flex items-center">自动收缩临界值(px)</p>
                    <div>
                        <el-input style="width: 80px;" v-model="uiShow.foldRange" type="number" />
                    </div>
                </div>
            </div>
        </div>
        <div class="ui-setting-operation-wrapper w-full">
            <div>
                <el-button class="w-full" type="primary" icon="DocumentCopy">一键复制配置</el-button>
            </div>
            <div class="mt-4">
                <el-button class="w-full" type="info" icon="RefreshRight">恢复默认配置</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import "./index.styl"

interface UIShow {
    sidebarLogo: boolean;
    sidebarCanFold: boolean;
    breadcrumb: boolean;
    tagBar: boolean;
    foldRange: number
}

const value = defineModel()
const theme = ref<string>()
const uiShow = reactive<UIShow>({
    sidebarLogo: false,
    sidebarCanFold: true,
    breadcrumb: false,
    tagBar: false,
    foldRange: 1024
})
const handleClose = (done: () => void) => {
    done()
}

onMounted(() => {
})
</script>