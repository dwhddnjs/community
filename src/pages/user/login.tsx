import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { LoginSchema } from "./schemas"
import Button from "@components/button"
import { useLogin } from "@hooks/mutation/auth-mutation"

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { mutate } = useLogin()
  const navigate = useNavigate()

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    mutate(data)
  }

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <main className="min-w-80 flex-grow flex items-center justify-center">
        <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
          <div className="text-center py-4" onClick={() => navigate("/")}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              로그인
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="email"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("email", { min: 8 })}
              />
              {errors.email && (
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("password", { min: 8 })}
              />
              {errors.password && (
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
              <a
                href="#"
                className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
              >
                비밀번호를 잊으셨나요?
              </a>
            </div>
            <div className="mt-10 flex justify-center items-center">
              <Button bgColor="orange" type="submit">
                로그인
              </Button>
              <Button bgColor="gray" onClick={() => navigate("/user/signup")}>
                회원가입
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
