import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

export const useAuth = () => {
  // ===============================
  // state
  // ===============================
  const user = useState<User | null>("fb_user", () => null);

  // 起動時チェック専用
  const loading = useState<boolean>("fb_loading", () => true);

  // ボタン操作専用
  const processing = useState<boolean>("fb_processing", () => false);

  const inited = useState<boolean>("fb_inited", () => false);

  const error = useState<string | null>("fb_error", () => null);

  // ===============================
  // ⭐ 共通ラッパー（これがキモ）
  // ===============================
  const withProcessing = async <T>(
    fn: () => Promise<T>,
    minMs = 5000, // ← 最低表示時間（好きに調整OK）
  ): Promise<T> => {
    processing.value = true;

    const start = Date.now();

    try {
      return await fn();
    } finally {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minMs - elapsed);

      setTimeout(() => {
        processing.value = false;
      }, wait);
    }
  };

  // ===============================
  // init（起動時のみ）
  // ===============================
  const init = () => {
    if (!import.meta.client) return;
    if (inited.value) return;

    inited.value = true;

    const auth = getAuth();

    onAuthStateChanged(auth, (u) => {
      user.value = u;
      loading.value = false;
    });
  };

  // ===============================
  // login
  // ===============================
  const login = async (email: string, password: string) => {
    error.value = null;

    return withProcessing(async () => {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    }, 500);
  };

  // ===============================
  // register
  // ===============================
  const register = async (
    email: string,
    password: string,
    username?: string,
  ) => {
    error.value = null;

    return withProcessing(async () => {
      const auth = getAuth();

      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (username) {
        await updateProfile(cred.user, { displayName: username });
        user.value = auth.currentUser;
      }
    }, 800);
  };

  // ===============================
  // logout
  // ===============================
  const logout = async () => {
    error.value = null;

    return withProcessing(async () => {
      const auth = getAuth();
      await signOut(auth);
    }, 300);
  };

  // ===============================
  // token取得（Laravel API用）
  // ===============================
  const getIdToken = async () => {
    if (!inited.value) init();

    while (loading.value) {
      await new Promise((r) => setTimeout(r, 30));
    }

    const auth = getAuth();
    const u = auth.currentUser;
    if (!u) return null;

    return await u.getIdToken();
  };

  return {
    user,
    loading,
    processing,
    error,
    init,
    login,
    register,
    logout,
    getIdToken,
  };
};
