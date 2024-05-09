import { create } from "zustand";

export type User = {
  id: string;
  email: string;
};
interface UserState {
  user: User | null;
  setUser: (param: any) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (value: any) => set(() => ({ user: value })),
}));
