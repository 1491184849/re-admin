<template>
    <el-image :style="getStyle()" :src="src" :preview-src-list="previewList" fit="cover" />
</template>

<script setup lang="ts">
const props = defineProps<{
    width: string;
    height: string;
    roundedFull: boolean;
    src: string;
    previewList: string[]
}>();

const getStyle = () => {
    const style = { width: props.width, height: props.height };
    if (props.roundedFull) {
        style['borderRadius'] = "50%";
    }
    return style;
}
</script>