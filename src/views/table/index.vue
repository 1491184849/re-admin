<template>
  <div>
    <re-table row-key="id" :data="data" :columns="columns" :enabled-filter="true" :filters="filters">
      <template #toolbar>
        <el-button type="primary" icon="Plus">新增</el-button>
        <el-button type="danger" icon="Delete" :disabled="true">批量删除</el-button>
      </template>
    </re-table>
  </div>
</template>

<script setup lang="ts">
import {useTable} from "./hook.tsx"
import ReTable from "@/components/re-table/index.vue"

const {
  data,
  columns,
  filters
} = useTable()
</script>