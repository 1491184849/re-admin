<template>
  <div class="sidebar-wrapper">
    <el-menu default-active="2" active-text-color="#ffffff" background-color="#17253b" text-color="#7c859f"
      @open="handleOpen" @close="handleClose" class="custom-el-emnu" router :collapse="model">
      <sidebar-item v-for="(item, index) in menus" :key="index" :item="item" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import './index.styl'
import SidebarItem from './sidebar-item.vue'
import { getSidebarMenus, MenuItem } from "@/api/menu"

const model = defineModel()
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
// 监听收缩状态
watch(() => model.value, (val) => {
  const elMenuDom = document.querySelector(".custom-el-emnu")
  if (!elMenuDom) return;
  // true收缩，false展开
  if (val) {
    document.querySelector(".el-aside")?.classList?.add("re-el-menu--collapse");
    document.querySelector(".el-header")?.classList?.add("re-el-header-width");
    document.querySelector(".re-tab-wrapper")?.classList?.add("re-el-header-width");
  } else {
    document.querySelector(".el-aside")?.classList?.remove("re-el-menu--collapse");
    document.querySelector(".el-header")?.classList?.remove("re-el-header-width");
    document.querySelector(".re-tab-wrapper")?.classList?.remove("re-el-header-width");
  }
})
</script>