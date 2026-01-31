import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

export const useAuth = () => {
  const user = useState<User | null>("fb_user", () => null);
  const loading = useState<boolean>("fb_loading", () => true);

  // initが二重に購読しないためのフラグ
  const inited = useState<boolean>("fb_inited", () => false);

  const init = () => {
    if (!process.client) return;
    if (inited.value) return;
    inited.value = true;

    // ★pluginでprovideしたauthを使う
    const { $firebaseAuth } = useNuxtApp();

    onAuthStateChanged($firebaseAuth, (u) => {
      user.value = u;
      loading.value = false;
    });
  };

  const register = async (
    email: string,
    password: string,
    username: string,
  ) => {
    const { $firebaseAuth } = useNuxtApp();
    const cred = await createUserWithEmailAndPassword(
      $firebaseAuth,
      email,
      password,
    );
    await updateProfile(cred.user, {
      displayName: username,
    });

    user.value = cred.user;
  };

  const login = async (email: string, password: string) => {
    const { $firebaseAuth } = useNuxtApp();
    await signInWithEmailAndPassword($firebaseAuth, email, password);
  };

  const logout = async () => {
    const { $firebaseAuth } = useNuxtApp();
    await signOut($firebaseAuth);
    user.value = null;
  };

  const getIdToken = async () => {
    const { $firebaseAuth } = useNuxtApp();
    const u = $firebaseAuth.currentUser;
    if (!u) return null;
    return await u.getIdToken();
  };

  return { user, loading, init, register, login, logout, getIdToken };
};
