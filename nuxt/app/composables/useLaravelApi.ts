export const useLaravelApi = () => {
  const config = useRuntimeConfig();
  const { getIdToken } = useAuth();

  const api = $fetch.create({
    baseURL: config.public.apiBase, // 例: http://localhost:8000/api
    async onRequest({ options }) {
      const token = await getIdToken();
      if (token) {
        options.headers = {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        };
      }
    },
  });

  return { api };
};
