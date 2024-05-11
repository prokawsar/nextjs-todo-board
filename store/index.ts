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

interface LoaderState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoaderState>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
