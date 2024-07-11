import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { PostSchema } from "./schemas"
import * as z from "zod"
import Button from "@components/button"
import { useAddPost } from "@hooks/mutation/post-mutation"

function New() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })
  const { mutate } = useAddPost()

  const onSubmit = (data: z.infer<typeof PostSchema>) => {
    const requestBody = {
      ...data,
      type: "jongwon",
    }
    mutate(requestBody)
  }

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gcray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              {...register("title")}
            />

            {errors?.title?.message && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors?.title?.message}
              </p>
            )}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              rows={1}
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              {...register("content")}
            ></textarea>
            {errors?.content?.message && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors?.content?.message}
              </p>
            )}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Button type="submit">등록</Button>
            <Button type="reset" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default New
