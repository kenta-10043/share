<script setup lang="ts">
const api = useLaravelApi()

// まずは画面に出すために ref に入れる
const me = ref<any>(null)
const err = ref<any>(null)

try {
    me.value = await api.get("/me")
} catch (e: any) {
    err.value = {
        status: e?.status ?? e?.response?.status ?? null,
        message: e?.data ?? e?.message ?? String(e),
    }
    console.error("API error:", e)
}
</script>

<template>
    <div style="padding:16px">
        <h1>/me チェック</h1>

        <h3>result</h3>
        <pre>{{ me }}</pre>

        <h3>error</h3>
        <pre>{{ err }}</pre>
    </div>
</template>
