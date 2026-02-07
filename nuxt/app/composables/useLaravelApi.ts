type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const useLaravelApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase; // http://localhost:8000

  const { getIdToken } = useAuth();

  // =========================
  // 共通リクエスト関数（本体）
  // =========================
  const request = async <T>(
    path: string,
    method: Method = "GET",
    body?: any,
  ): Promise<T> => {
    const token = await getIdToken(); // ← ★ 自動でloading待ち＋取得

    return await $fetch<T>(`${baseURL}/api${path}`, {
      method,
      body,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  };

  // =========================
  // 使いやすいショートカット
  // =========================
  const get = <T>(path: string) => request<T>(path, "GET");
  const post = <T>(path: string, body?: any) => request<T>(path, "POST", body);
  const put = <T>(path: string, body?: any) => request<T>(path, "PUT", body);
  const del = <T>(path: string) => request<T>(path, "DELETE");

  return { get, post, put, del };
};
