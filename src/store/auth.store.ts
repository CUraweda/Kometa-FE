import { create } from "zustand";

// Definisi tipe untuk state autentikasi
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
  setAuth: (data: { accessToken: string; refreshToken: string; role: string }) => void;
  clearAuth: () => void;
}

// Fungsi untuk memulihkan state dari localStorage
const initializeAuthState = (): AuthState => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const role = localStorage.getItem("role");
  const isAuthenticated = Boolean(accessToken && refreshToken);

  return {
    accessToken,
    refreshToken,
    role,
    isAuthenticated,
    setAuth: () => {}, // Placeholder, akan di-overwrite oleh Zustand
    clearAuth: () => {}, // Placeholder, akan di-overwrite oleh Zustand
  };
};

// Zustand store
const useAuthStore = create<AuthState>((set) => ({
  ...initializeAuthState(),

  setAuth: ({ accessToken, refreshToken, role }) => {
    // Simpan data ke Zustand
    set({
      accessToken,
      refreshToken,
      role,
      isAuthenticated: true,
    });

    // Simpan data ke localStorage
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("role", role);
  },

  clearAuth: () => {
    // Hapus data dari Zustand
    set({
      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
    });

    // Hapus data dari localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  },
}));

export default useAuthStore;
