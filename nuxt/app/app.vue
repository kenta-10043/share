<script setup lang="ts">
const { init, loading } = useAuth();
onMounted(() => init());

</script>

<template>

    <div>

        <NuxtRouteAnnouncer />
        <NuxtPage />

    </div>
    <p v-if="loading" class="text-white text-center mt-6">loading...</p>

</template>
