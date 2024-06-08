<template>
    <div>
        <ul>
            <li v-for="i in 100" :key="i">列表{{ i }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
})
</script>