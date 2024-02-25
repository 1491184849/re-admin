<template>
  <div class="sidebar-wrapper">
    <el-menu default-active="2" active-text-color="#ffffff" background-color="#17253b" text-color="#7c859f"
      @open="handleOpen" @close="handleClose" class="custom-el-emnu">
      <sidebar-item v-for="(item, index) in menus" :key="index" :item="item" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import './index.styl'
import SidebarItem from './sidebar-item.vue'
import { getSidebarMenus, MenuItem } from "@/api/menu"

const menus = ref<MenuItem[]>([])
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

onMounted(() => {
  getSidebarMenus().then(res => menus.value = res.data)
})
</script>