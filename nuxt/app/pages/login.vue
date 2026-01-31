<script setup lang="ts">


const email = ref("");
const password = ref("");
const errorMsg = ref("");

const { login } = useAuth();
const handleLogin = async () => {
    errorMsg.value = "";
    try {
        await login(email.value.trim(), password.value);
        await navigateTo("/");
    } catch (e: any) {
        switch (e?.code) {
            case "auth/invalid-email":
                errorMsg.value = "メールアドレスの形式が正しくありません";
                break;
            case "auth/user-not-found":
                errorMsg.value = "そのメールアドレスのユーザーは存在しません";
                break;
            case "auth/wrong-password":
            case "auth/invalid-credential":
                errorMsg.value = "メールアドレスまたはパスワードが違います";
                break;
            case "auth/too-many-requests":
                errorMsg.value = "試行回数が多すぎます。しばらく待ってから再試行してください";
                break;
            default:
                errorMsg.value = "ログインに失敗しました";
        }

    }
};

</script>




<template>
    <AuthHeader />

    <main class="bg-black mt-32">
        <p class="text-white w-full text-center mb-2">{{ errorMsg }}</p>
        <section class="bg-white w-96 h-60 mx-auto rounded-md">
            <h1 class="font-bold text-center pt-4">ログイン</h1>
            <form @submit.prevent="handleLogin" class="flex flex-col items-center">
                <input class="border border-black rounded-lg w-80 h-10 m-3 " v-model="email" type="email"
                    placeholder="  メールアドレス">
                <input class="border border-black rounded-lg w-80 h-10 m-3 " v-model="password" type="password"
                    placeholder="  パスワード">
                <button type="submit"
                    class="bg-blue-600 w-32  text-white font-bold p-2 rounded-full shadow-sm shadow-gray-800 hover:bg-blue-400  active:translate-y-1">
                    ログイン
                </button>

            </form>
        </section>

    </main>
</template>