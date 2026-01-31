<script setup lang="ts">
const { init } = useAuth();
onMounted(() => init());
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <NuxtPage />
    </div>
</template>
