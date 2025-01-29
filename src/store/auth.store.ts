import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  id: string| null
  isAuthenticated: boolean;
  setAuth: (data: { accessToken: string; refreshToken: string; role: string, id: string }) => void;
  clearAuth: () => void;
}

const initializeAuthState = (): AuthState => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem('id')
  const isAuthenticated = Boolean(accessToken && refreshToken);

  return {
    accessToken,
    refreshToken,
    role,
    isAuthenticated,
    id,
    setAuth: () => {}, 
    clearAuth: () => {}, 
  };
};

const useAuthStore = create<AuthState>((set) => ({
  ...initializeAuthState(),

  setAuth: ({ accessToken, refreshToken, role, id }) => {
   
    set({
      accessToken,
      refreshToken,
      role,
      id,
      isAuthenticated: true,
    });

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("role", role);
    localStorage.setItem('id', id)
  },

  clearAuth: () => {
    
    set({
      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
      id: null
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem('id')
  },
}));

export default useAuthStore;
