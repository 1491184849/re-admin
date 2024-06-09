<template>
    <div>
        <re-table row-key="id" :request="request" :columns="columns" :enabled-filter="true" :filters="filters"
            ref="tableRef" @selection-change="selectionChange">
            <template #toolbar>
                <el-button type="primary" icon="Plus" plain>新增</el-button>
                <el-button type="danger" icon="Delete" :disabled="manyButtonEnabled" plain>批量删除</el-button>
            </template>
        </re-table>
    </div>
</template>

<script setup lang="ts">
import { useTable } from "./hook.tsx"
import { onMounted, ref } from "vue";

const {
    request,
    columns,
    filters,
    tableRef
} = useTable();
const manyButtonEnabled = ref<boolean>(true);
const selectionChange = (rows: any[]) => {
    manyButtonEnabled.value = !(rows && rows.length > 0);
}
onMounted(() => {
    console.debug(tableRef.value?.refresh)
})
</script>