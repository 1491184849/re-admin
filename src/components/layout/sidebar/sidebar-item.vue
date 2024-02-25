<script setup lang="ts">
import { MenuItem } from "@/api/menu"
defineProps<{ item: MenuItem }>();
</script>

<template>
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
        <template #title>
            <!-- <Icon v-if="item.meta.icon" :icon="item.meta.icon" class="mr-2" /> -->
            <span>{{ item.title }}</span>
        </template>
        <sidebar-item v-for="(v, i) in item.children" :key="i" :item="v"></sidebar-item>
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
        <template #title>
            <!-- <Icon v-if="item.meta.icon" :icon="item.meta.icon" class="mr-2" /> -->
            <span>{{ item.title }}</span>
        </template>
    </el-menu-item>
</template>