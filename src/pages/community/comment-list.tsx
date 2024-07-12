import { useForm } from "react-hook-form"
import { CommentItem } from "./comment-item"
import { useParams } from "react-router-dom"

import { zodResolver } from "@hookform/resolvers/zod"
import { CommentSchema } from "./schemas"
import * as z from "zod"
import { CommentType } from "types"
import { useAddComment } from "@hooks/mutation/comment-mutation"
import Button from "@components/button"

interface CommentListProps {
  comments?: CommentType[]
}

const CommentList = ({ comments }: CommentListProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
    },
  })
  const { _id } = useParams()
  const { mutate } = useAddComment(_id)

  const list = comments?.map((comment: CommentType) => (
    <CommentItem key={comment._id} comment={comment} />
  ))

  const onSubmit = (data: z.infer<typeof CommentSchema>) => {
    const requestBody = {
      content: data.content,
    }
    mutate(requestBody)
    reset({
      content: "",
    })
  }

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">
        댓글 {comments ? comments.length : "0"} 개
      </h4>
      {list}

      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <textarea
              rows={3}
              cols={40}
              className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="내용을 입력하세요."
              {...register("content", { min: 1 })}
            ></textarea>

            {errors.content && (
              <p className="ml-2 mt-1 text-sm text-red-500">
                {errors.content.message}
              </p>
            )}
          </div>
          <Button type="submit">댓글 등록</Button>
        </form>
      </div>
    </section>
  )
}

export default CommentList
