export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;

  const { user, loading, init } = useAuth();
  init();

  const publicPaths = ["/login", "/register"];
  if (publicPaths.includes(to.path)) {
    if (user.value) return navigateTo("/");
    return;
  }

  while (loading.value) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  if (!user.value) {
    return navigateTo("/login");
  }
});
