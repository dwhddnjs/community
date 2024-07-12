import { CommentSchema } from "@pages/community/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRequest, postRequest } from "@utils/network"
import { CommentType, PostTypes, ResponseTypes } from "types"
import * as z from "zod"

const useAddComment = (id: string | undefined) => {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: z.infer<typeof CommentSchema>) =>
      await postRequest<typeof data>(`/posts/${id}/replies`, data),
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

const useDeleteComment = (
  postId: string | undefined,
  commentId: number | undefined
) => {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async () =>
      postId && (await deleteRequest(`/posts/${postId}/replies/${commentId}`)),
    onSuccess: () =>
      queryClient.setQueryData(
        ["post"],
        (prevPost: ResponseTypes<PostTypes>) => {
          const filterPost = prevPost?.item?.replies?.filter(
            (item: CommentType) => item._id !== commentId
          )
          return {
            ...prevPost,
            item: {
              ...prevPost?.item,
              replies: prevPost?.item?.replies ? filterPost : [],
            },
          }
        }
      ),
    onError: (error) => console.log(error),
  })

  return {
    mutate,
    isPending,
    isError,
  }
}

export { useAddComment, useDeleteComment }
