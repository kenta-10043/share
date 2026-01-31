<script setup lang="ts">
const { user } = useAuth();
</script>

<template>

    <h1 class="text-white">ME PAGE</h1>
    <div>
        <p class="text-white">メール: {{ user?.email }}</p>
        <p class="text-white">ユーザー名: {{ user?.displayName }}</p>
    </div>
</template>
