<script setup lang="ts">
import { MenuItem } from "@/api/menu"
import ReIcon from '@/components/re-icon/index.vue'

defineProps<{ item: MenuItem }>();
</script>

<template>
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
        <template #title>
            <re-icon v-if="item.meta?.icon" :name="item.meta.icon" class="mr-2" />
            <span>{{ item.title }}</span>
        </template>
        <sidebar-item v-for="(v, i) in item.children" :key="i" :item="v"></sidebar-item>
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
        <template #title>
            <re-icon v-if="item.meta?.icon" :name="item.meta.icon" class="mr-2" />
            <span>{{ item.title }}</span>
        </template>
    </el-menu-item>
</template>