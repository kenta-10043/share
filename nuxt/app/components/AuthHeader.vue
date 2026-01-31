<script setup>
import logo from '@/assets/images/logo.png'

</script>

<template>
    <header>
        <div class="bg-black h-24  flex justify-between">
            <img :src="logo" class="w-44 h-16 mt-3 object-cover pt-5" alt="logo">
            <div class="text-white font-bold flex items-center mr-6">
                <NuxtLink to="/register" class="inline-block">新規登録</NuxtLink>
                <NuxtLink to="/login" class="inline-block ml-6">ログイン</NuxtLink>
            </div>

        </div>

    </header>
</template>