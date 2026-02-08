<script setup lang="ts">
const { getIdToken } = useAuth();
const apiBase = useRuntimeConfig().public.apiBase;

const token = await getIdToken(); // これはOK（でも未ログインだと空になる）

const { data: me, pending, error, refresh } = useFetch(`${apiBase}/api/me`, {
    server: false,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
});




</script>

<template>
    <SideNav />

</template>