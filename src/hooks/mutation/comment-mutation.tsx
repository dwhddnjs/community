import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postRequest } from "@utils/network"
// import { useNavigate } from "react-router-dom"

export const useAddComment = (id: any) => {
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data) => await postRequest(`/posts/${id}/replies`, data),
    onSuccess: (data) => {
      return queryClient.setQueryData(["post"], (prevPost: any) => ({
        ...prevPost,
        item: {
          ...prevPost?.item,
          replies: prevPost.item.replies
            ? [...prevPost.item.replies, data.item]
            : [data.item],
        },
      }))
    },
    onError: (error) => console.log(error),
  })

  return {
    mutate,
    isPending,
    isError,
  }
}
