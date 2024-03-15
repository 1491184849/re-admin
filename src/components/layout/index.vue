<template>
  <div>
    <el-container>
      <el-aside>
        <side-bar v-model="collapse" @menu-selected="menuSelected"/>
      </el-aside>
      <el-container>
        <el-header>
          <nav-bar @change-sidebar-status="changeSidebarStatus" @jump-page="menuSelected"/>
        </el-header>
        <re-tab v-model="tabs" ref="tabRef"/>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import "./index.styl"
import SideBar from "./sidebar/index.vue";
import NavBar from "./navbar/index.vue"
import ReTab from "./re-tab/index.vue"
import {onMounted, ref} from "vue";
import {RouteRecordRaw} from "vue-router";

const collapse = ref<boolean>(false);
const tabs = ref<RouteRecordRaw[]>([]);
const tabRef = ref();
const changeSidebarStatus = (_collapse: boolean) => {
  collapse.value = _collapse
}
const menuSelected = (menuItem: RouteRecordRaw) => {
  const index = tabs.value?.findIndex(x => x.path === menuItem.path);
  if (index === -1) {
    tabs.value?.push(menuItem);
    tabRef.value.addTab();
  }
}
onMounted(() => {
})
</script>