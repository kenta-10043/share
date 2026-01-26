<script setup>
const apiBase = useRuntimeConfig().public.apiBase;
const { data, pending, error, refresh } = await useFetch(`${apiBase}/api/health`);
</script>

<template>
    <main style="padding: 24px;">
        <h1>Nuxt=>laravel 疎通確認</h1>
        <p>API_BASE:{{ apiBase }}</p>

        <button @click="refresh()">再読み込み</button>

        <div v-if="pending">loading...</div>
        <pre v-else-if="data">{{ data }}</pre>
        <pre v-else>{{ error }}</pre>

    </main>
</template>