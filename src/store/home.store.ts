import { create } from "zustand";

interface State {
  idMember: string | null;
  setMember: (data: { idMember: string }) => void;
  clearMember: () => void;
}

const useMemberStore = create<State>((set) => {
 
  const isClient = typeof window !== "undefined";
  const storedIdMember = isClient ? localStorage.getItem("idMember") : null;

  return {
    idMember: storedIdMember,

    setMember: ({ idMember }) => {
      set(() => ({
        idMember,
      }));

      if (isClient) {
        localStorage.setItem("idMember", idMember);
      }
    },

    clearMember: () => {
      set(() => ({
        idMember: null,
      }));

      if (isClient) {
        localStorage.removeItem("idMember");
      }
    },
  };
});

export default useMemberStore;
