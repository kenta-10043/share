<script setup lang="ts">
const { init, loading } = useAuth();
onMounted(() => init());


</script>

<template>

    <div>
        <ClientOnly>
            <NuxtRouteAnnouncer />
            <NuxtPage />
        </ClientOnly>
    </div>
    <ClientOnly>
        <p v-if="loading" class="text-white text-center mt-6">loading...</p>
    </ClientOnly>


</template>
