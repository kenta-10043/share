<script setup lang="ts">
import logo from '@/assets/images/logo.png'
import home from '@/assets/images/home.png'
import logoutImg from '@/assets/images/logout.png'

const { logout, processing } = useAuth();
const handleLogout = async () => {
    await logout();
    await navigateTo("/login");
}
const message = ref("");
const onSendMessage = () => {

}


</script>

<template>
    <aside class="border-2 border-white max-w-[20%] h-screen">
        <h2><img class="w-52 mt-9" :src="logo" alt="logo"></h2>
        <section class="min-w-[64px] ml-5 mt-9">
            <div>
                <NuxtLink class="flex" to="/">
                    <img class="w-6 inline-block" :src="home" alt="home">
                    <p class="text-white text-lg">ホーム</p>
                </NuxtLink>
            </div>

            <div class="flex mt-7">
                <img class="w-6 inline-block" :src="logoutImg" alt="logout">
                <button @click="handleLogout" :disabled="processing" class="text-white text-lg">{{ processing ?
                    "ログアウト中..." : "ログアウト" }}</button>
            </div>

            <form @submit="onSendMessage" class="flex flex-col mt-7 mr-5">
                <label class="text-white" for="text">シェア</label>
                <textarea v-model="message" id="text"
                    class="text-white border border-white bg-black w-full h-48 mt-5 focus:ring-2 focus:ring-blue-500 "></textarea>
                <button type="submit"
                    class="bg-blue-600 w-32  text-white font-bold p-2 rounded-full shadow-sm shadow-white hover:bg-blue-400  active:translate-y-1 ml-auto mt-5">
                    シェアする
                </button>
            </form>
        </section>






    </aside>
</template>