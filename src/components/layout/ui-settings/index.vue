<template>
    <el-drawer v-model="value" title="界面设置" direction="rtl" :before-close="handleClose">
        <span>Hi, there!</span>
    </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import "./index.styl"

const value = defineModel()
const handleClose = (done: () => void) => {
    done()
}

onMounted(() => {
})
</script>