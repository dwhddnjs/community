import { Button } from "@components/button"
import { Theme } from "@components/theme"
import { useUser } from "@hooks/zustand/use-user"
import { getImageUrl } from "@utils/function"
import { removeLocalStorage } from "@utils/storage"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Header = () => {
  const { isLogin, user, setUser, setLogin } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const Logo = () => (
    <div className="w-1/2 order-1 md:w-auto">
      <Link to="/" className="flex items-center gap-2">
        <img
          className="mr-3 h-6 sm:h-9"
          src="/images/favicon.svg"
          alt="로고 이미지"
        />
        <span className="text-lg font-bold">멋사컴</span>
      </Link>
    </div>
  )

  const path = ["정보공유", "자유게시판", "질문게시판"].map((path) => (
    <li className="hover:text-amber-500 hover:font-semibold" key={path}>
      <Link to="/info">{path}</Link>
    </li>
  ))

  const onLogout = () => {
    setIsLoading(true)
    if (isLogin) {
      removeLocalStorage("ACCESS_TOKEN")
      removeLocalStorage("REFRESH_TOKEN")
      setUser(null)
      setLogin(false)
      navigate("/")
      setIsLoading(false)
    }
  }

  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <Logo />
        <div className="w-auto order-2 text-base mt-4 md:mt-0">
          <ul className="flex items-center gap-6 uppercase">{path}</ul>
        </div>
        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
          {isLogin && (
            <p className="flex items-center">
              <img
                className="w-8 rounded-full mr-2"
                src={
                  isLogin
                    ? getImageUrl(user?.img as string)
                    : "https://api.fesp.shop/files/00-sample/user-muzi.webp"
                }
              />
              {user?.name}
              <Button type="button" onClick={onLogout} disabled={isLoading}>
                로그아웃
              </Button>
            </p>
          )}
          {!isLogin && (
            <div className="flex justify-end">
              <Button
                onClick={() => navigate("/user/login")}
                color="orange"
                disabled={isLoading}
              >
                로그인
              </Button>
              <Button
                bgColor="gray"
                onClick={() => navigate("/user/signup")}
                disabled={isLoading}
              >
                회원가입
              </Button>
            </div>
          )}
          <Theme isLoading />
        </div>
      </nav>
    </header>
  )
}
