import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@utils/network"

export const usePost = (id: string | undefined) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["post"],
    queryFn: async () => id && (await fetcher(`/posts/${id}`)),
  })

  return {
    data,
    isPending,
    error,
  }
}

export const usePosts = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await fetcher(`/posts?type=jongwon`),
  })

  return {
    data,
    isPending,
    error,
  }
}
