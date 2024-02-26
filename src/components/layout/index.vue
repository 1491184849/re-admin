<template>
  <div>
    <el-container>
      <el-aside>
        <side-bar v-model="collapse" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-bar @change-sidebar-status="changeSidebarStatus" />
        </el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import "./index.styl"
import SideBar from "./sidebar/index.vue";
import NavBar from "./navbar/index.vue"
import { onMounted, ref } from "vue";

const collapse = ref<boolean>(false);
const changeSidebarStatus = (_collapse: boolean) => {
  collapse.value = _collapse
}
onMounted(() => {
})
</script>