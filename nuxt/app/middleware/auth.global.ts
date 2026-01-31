export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth();

  const publicPaths = ["/login", "/register"];
  if (publicPaths.includes(to.path)) {
    if (user.value) return navigateTo("/");
    return;
  }

  if (!user.value) {
    return navigateTo("/login");
  }
});
