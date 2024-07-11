import { PostSchema } from "@pages/community/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRequest, patchRequest, postRequest } from "@utils/network"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

export const useAddPost = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data) => await postRequest("/posts", data),
    onMutate: (data: any) => queryClient.setQueryData(["posts"], data),
    onSuccess: () => navigate("/info"),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}

export const useDeletePost = (id: any) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async () => await deleteRequest(`/posts/${id}`),
    onMutate: (data) => queryClient.setQueryData(["posts"], data as any),
    onSuccess: () => navigate("/info"),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}

export const useUpdatePost = (id: string | undefined) => {
  const navigate = useNavigate()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: z.infer<typeof PostSchema>) =>
      id && (await patchRequest(`/posts/${id}`, data)),
    onSuccess: () => navigate(`/info/${id}`),
    onError: (error) => console.log(error),
  })

  return { mutate, isPending, isError }
}
