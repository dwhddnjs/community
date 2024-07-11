import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
  id?: string
  email?: string
  name?: string
  img?: string
  type?: string
}

type UserStoreTypes = {
  isLogin: boolean
  user: User
  setLogin: (value: boolean) => void
  setUser: (value: Required<User>) => void
}

export const useUser = create(
  persist<UserStoreTypes>(
    (set) => ({
      isLogin: false,
      user: {
        id: undefined,
        email: undefined,
        name: undefined,
        img: undefined,
        type: undefined,
      },

      setLogin: (value) => set({ isLogin: value }),

      setUser: (user) =>
        set({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            img: user.img,
            type: user.type,
          },
        }),
    }),
    { name: "user" }
  )
)
