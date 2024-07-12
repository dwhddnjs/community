import { useUser } from "@hooks/zustand/use-user"
import { LoginSchema, SignupSchema } from "@pages/user/schemas"
import { useMutation } from "@tanstack/react-query"
import { postFormRequest, postRequest } from "@utils/network"
import { setLocalStorage } from "@utils/storage"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

const useLogin = () => {
  const navigate = useNavigate()
  const { setLogin, setUser } = useUser()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: z.infer<typeof LoginSchema>) =>
      await postRequest<typeof data>("/users/login", data),
    onSuccess: (res) => {
      setLocalStorage("ACCESS_TOKEN", res.item.token.accessToken)
      setLocalStorage("REFRESH_TOKEN", res.item.token.refreshToken)
      setLogin(true)
      setUser({
        id: res.item._id,
        email: res.item.email,
        name: res.item.name,
        img: res.item.profileImage.path,
        type: res.item.type,
      })
      navigate("/")
    },
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}

const useSignup = () => {
  const navigate = useNavigate()
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (
      data: z.infer<typeof SignupSchema> & { formData: FormData }
    ) => {
      const res = await postFormRequest("/files", data.formData)
      const request = {
        email: data.email,
        password: data.password,
        name: data.name,
        type: "user",
        profileImage: {
          originalname: res.item[0]?.originalname,
          name: res.item[0]?.name,
          path: res.item[0]?.path,
        },
      }
      await postRequest("/users", request)
    },
    onSuccess: () => navigate("/user/login"),
    onError: (error) => console.log(error),
  })
  return { mutate, isPending, isError }
}

export { useSignup, useLogin }
