<script setup lang="ts">
const { init, loading } = useAuth();
onMounted(() => init());
</script>

<template>
    <p v-if="loading" class="text-white">loading...</p>
    <div v-else>
        <NuxtRouteAnnouncer />
        <NuxtPage />
    </div>
</template>
