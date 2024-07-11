import { z } from "zod"

export const PostSchema = z.object({
  title: z.string().min(1, {
    message: "제목을 작성해주세요",
  }),
  content: z.string().min(1, {
    message: "내용을 작성해주세요",
  }),
})

export const CommentSchema = z.object({
  content: z.string().min(1, {
    message: "내용을 작성해주세요",
  }),
})
