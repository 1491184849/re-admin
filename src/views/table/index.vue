<template>
  <div>
    <re-table row-key="id" :data="data" :columns="columns" :enabled-filter="true" :filters="filters" ref="tableRef"
              @selection-change="selectionChange">
      <template #toolbar>
        <el-button type="primary" icon="Plus">新增</el-button>
        <el-button type="danger" icon="Delete" :disabled="manyButtonEnabled">批量删除</el-button>
      </template>
    </re-table>
  </div>
</template>

<script setup lang="ts">
import {useTable} from "./hook.tsx"
import ReTable from "@/components/re-table/index.vue"
import {onMounted, ref} from "vue";

const {
  data,
  columns,
  filters,
  tableRef
} = useTable();
const manyButtonEnabled = ref<boolean>(true);
const selectionChange = (rows: any[]) => {
  manyButtonEnabled.value = !(rows && rows.length > 0);
}
onMounted(() => {
  console.log(tableRef.value?.refresh)
})
</script>