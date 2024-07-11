import * as z from "zod"

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "최소 1글자 이상 작성해주세요" })
    .email("이메일 주소가 유효하지 않습니다"),
  password: z.string().min(7, { message: "최소 7자 이상 작성해주세요" }),
})

export const SignupSchema = z.object({
  email: z.string().email({
    message: "이메일 주소가 유효하지 않습니다",
  }),
  password: z.string().min(7, {
    message: "최소 7자 이상 작성해주세요",
  }),
  name: z.string().min(1, {
    message: "최소 1글자 이상 작성해주세요",
  }),
})
