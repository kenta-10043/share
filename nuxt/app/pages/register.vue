<script setup lang="ts">
const { register } = useAuth();

const email = ref('');
const password = ref('');
const username = ref('');
const errorMsg = ref('');

const onSubmit = async () => {
    errorMsg.value = '';
    try {
        await register(email.value, password.value, username.value);
        await navigateTo('/');
    } catch (e: any) {
        errorMsg.value = e?.message ?? '登録に失敗しました'
    }
};

</script>

<template>
    <AuthHeader />

    <main class="bg-black mt-32">
        <p>{{ errorMsg }}</p>
        <section class="bg-white w-96 h-72 mx-auto rounded-md">
            <h1 class="font-bold text-center pt-4">新規登録</h1>
            <form @submit.prevent="onSubmit" class="flex flex-col items-center">
                <input v-model='username' class="border border-black rounded-lg w-80 h-10 m-3 " type="text"
                    placeholder="  ユーザーネーム">
                <input v-model='email' class="border border-black rounded-lg w-80 h-10 m-3 " type="email"
                    placeholder="  メールアドレス">
                <input v-model='password' class="border border-black rounded-lg w-80 h-10 m-3 " type="password"
                    placeholder="  パスワード">
                <button type="submit"
                    class="bg-blue-600 w-32  text-white font-bold p-2 rounded-full shadow-sm shadow-gray-800 hover:bg-blue-400  active:translate-y-1">
                    新規登録
                </button>

            </form>
        </section>
    </main>
</template>