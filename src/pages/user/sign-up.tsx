import { postFormRequest, postRequest } from "@utils/network"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { SignupSchema } from "./schemas"
import Button from "@components/button"
import { useNavigate } from "react-router-dom"
// import { useNavigate } from "react-router-dom"

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()
  const [img, setImg] = useState<FileList | null>(null)

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.files)
  }

  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    console.log("adsadsdasdasdsa")
    const formData = new FormData()
    if (img) {
      formData.append("attach", img[0])
    }

    try {
      const res = await postFormRequest("/files", formData)
      if (res) {
        console.log("imageData: ", res.item[0])
        const request = {
          email: data.email,
          password: data.password,
          name: data.name,
          type: "user",
          profileImage: {
            originalname: res.item[0]?.originalname,
            name: res.item[0]?.name,
            path: res.item[0]?.path,
          },
        }
        await postRequest("/users", request)
        navigate("/user/login")
      }
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <main className="min-w-80 flex-grow flex items-center justify-center">
        <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
          <div className="text-center py-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              회원 가입
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="name"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                placeholder="이름을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("name", { min: 2 })}
              />

              {errors.name && (
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="email"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("email", { min: 3 })}
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
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("password", { min: 8 })}
              />

              {errors.password && (
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="profileImage"
              >
                프로필 이미지
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                placeholder="이미지를 선택하세요"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                onChange={onChangeImage}
              />
            </div>

            <div className="mt-10 flex justify-center items-center">
              <Button type="submit">회원가입</Button>
              <Button
                type="reset"
                bgColor="gray"
                onClick={() => navigate("/user/login")}
              >
                취소
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Signup
