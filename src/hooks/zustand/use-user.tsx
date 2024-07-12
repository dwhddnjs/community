import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
  id: string
  email: string
  name: string
  img: string
  type: string
}

type UserStoreTypes = {
  isLogin: boolean
  user: User | null
  setLogin: (value: boolean) => void
  setUser: (value: User | null) => void
}

export const useUser = create(
  persist<UserStoreTypes>(
    (set) => ({
      isLogin: false,
      user: null,
      setLogin: (value) => set({ isLogin: value }),
      setUser: (user) =>
        set({
          user: user,
        }),
    }),
    { name: "user" }
  )
)
