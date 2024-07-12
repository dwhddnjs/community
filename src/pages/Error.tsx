import { Button } from "@components/button"
import { Footer } from "@components/layout/footer"
import { Header } from "@components/layout/header"

function Error() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <Header />
      <div className="py-20 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex flex-col items-center space-y-2">
        <h2 className="text-lg font-semibold mb-2 text-center">
          🚧 앗, 무언가 잘못됐네요!
        </h2>
        <p className="text-center">
          이 오류는 더 나은 서비스를 위한 첫걸음이에요. 조금만 기다려 주세요!
        </p>
        <Button>⚙️ 문제 해결하기</Button>
      </div>
      <Footer />
    </div>
  )
}

export default Error
