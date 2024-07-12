import { PostSchema } from "@pages/community/schemas"
import { useMutation } from "@tanstack/react-query"
import { deleteRequest, patchRequest, postRequest } from "@utils/network"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

const useAddPost = () => {
  const navigate = useNavigate()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: z.infer<typeof PostSchema> & { type: string }) =>
      await postRequest("/posts", data),
    onSuccess: () => navigate("/info"),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
const useDeletePost = (id: string | undefined) => {
  const navigate = useNavigate()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async () => id && (await deleteRequest(`/posts/${id}`)),
    onSuccess: () => navigate("/info"),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}

const useUpdatePost = (id: string | undefined) => {
  const navigate = useNavigate()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: z.infer<typeof PostSchema>) =>
      id && (await patchRequest<typeof data>(`/posts/${id}`, data)),
    onSuccess: () => navigate(`/info/${id}`),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}

export { useAddPost, useDeletePost, useUpdatePost }
