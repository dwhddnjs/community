import {
  keepPreviousData,
  useQuery,
  //   useSuspenseQuery,
} from "@tanstack/react-query"
import { fetcher } from "@utils/network"
import { PaginationTypes } from "types"

const usePosts = (
  params: Pick<PaginationTypes, "page" | "limit"> & { keyword: string }
) => {
  // const { data, isPending, error, refetch } = useSuspenseQuery({
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["posts", params.page],
    queryFn: async () => {
      if (params.keyword !== "") {
        return await fetcher(
          `/posts?keyword=${params.keyword}&type=jongwon&page=${params.page}&limit=${params.limit}`
        )
      }
      return await fetcher(
        `/posts?type=jongwon&page=${params.page}&limit=${params.limit}&delay=3000`
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 3,
  })

  return {
    data,
    isPending,
    error,
    refetch,
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
