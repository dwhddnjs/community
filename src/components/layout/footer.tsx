import { Link } from "react-router-dom"

export const Footer = () => {
  const items = [
    "약관",
    "게시판 정책",
    "회사소개",
    "광고",
    "마이비즈니스",
    "제휴 제안",
    "이용약관",
    "개인정보취급방칭",
    "청소년보호 정책",
    "고객센터",
  ].map((item) => (
    <Link
      to="#"
      className="hover:font-semibold dark:hover:text-gray-200"
      key={item}
    >
      {item}
    </Link>
  ))

  return (
    <footer className="p-4 pb-12 w-full border-t border-t-slate-200  dark:border-t-slate-500 dark:bg-gray-600 text-gray-600 dark:text-white transition-color duration-500 ease-in-out">
      <div className="min-w-[320px] flex flex-wrap gap-4 justify-center items-center text-sm text-slate-400">
        {items}
      </div>
    </footer>
  )
}
