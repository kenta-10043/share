<script setup lang="ts">
const apiBase = useRuntimeConfig().public.apiBase;
const { data, pending, error, refresh } = await useFetch(`${apiBase}/api/health`);


</script>

<template>
    <SideNav />

</template>