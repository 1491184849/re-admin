<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <side-bar />
      </el-aside>
      <el-container>
        <el-header>
          <nav-bar />
        </el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SideBar from "./sidebar/index.vue";
import NavBar from "./navbar/index.vue"
import { onMounted } from "vue";

onMounted(() => {
})
</script>