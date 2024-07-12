import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetcher } from "@utils/network"

const usePosts = (page: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: async () =>
      await fetcher(`/posts?type=jongwon&page=${page}&limit=10`),
    placeholderData: keepPreviousData,
  })

  return {
    data,
    isPending,
    error,
  }
}

const usePost = (id: string | undefined) => {
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

export { usePost, usePosts }
