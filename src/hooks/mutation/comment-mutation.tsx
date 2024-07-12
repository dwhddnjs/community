import { CommentSchema } from "@pages/community/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequest } from "@utils/network"
import { PostTypes, ResponseTypes } from "types"
import * as z from "zod"
// import { useNavigate } from "react-router-dom"

export const useAddComment = (id: string | undefined) => {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: z.infer<typeof CommentSchema>) =>
      await postRequest(`/posts/${id}/replies`, data),
    onSuccess: (data) => {
      return queryClient.setQueryData(
        ["post"],
        (prevPost: ResponseTypes<PostTypes>) => ({
          ...prevPost,
          item: {
            ...prevPost?.item,
            replies: prevPost.item.replies
              ? [...prevPost.item.replies, data.item]
              : [data.item],
          },
        })
      )
    },
    onError: (error) => console.log(error),
  })

  return {
    mutate,
    isPending,
    isError,
  }
}
