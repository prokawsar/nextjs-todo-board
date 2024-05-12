import { Category, Todo } from '@/types/types'
import { create } from 'zustand'

export type User = {
  id: string
  email: string
}
interface UserState {
  user: User | null
  setUser: (param: any) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (value: any) => set(() => ({ user: value }))
}))

interface LoaderState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useLoadingStore = create<LoaderState>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading })
}))

interface cardDetailsState {
  cardBoard: string
  setCardBoard: (cardBoard: string) => void
}

export const useCardBoardStore = create<cardDetailsState>()((set) => ({
  cardBoard: '',
  setCardBoard: (cardBoard: string) => set({ cardBoard: cardBoard })
}))

interface dataState {
  todos: Todo[]
  categories: Category[]
  setTodosData: (todos: Todo[]) => void
  setCategoryData: (todos: Category[]) => void
}

export const useDataStore = create<dataState>()((set) => ({
  todos: [],
  categories: [],
  setTodosData: (todos: Todo[]) => set({ todos: todos }),
  setCategoryData: (categories: Category[]) => set({ categories: categories })
}))
