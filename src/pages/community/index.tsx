const Community = () => {
  const cardItems = [
    { title: "주요기능", description: "정보공유", url: "/info" },
    {
      title: "자유게시판",
      description: "자유롭게 이야기를 나누세요.",
      url: "/free",
    },
    {
      title: "질문 게시판",
      description: "궁금한 점을 질문하고 답변을 받아보세요.",
      url: "/qna",
    },
  ].map((card) => (
    <div
      className="bg-white p-6 rounded shadow dark:bg-gray-800"
      key={card.title}
    >
      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
      <p className="mb-4">{card.description}</p>
      <a href={card.url} className="text-orange-500 hover:underline">
        바로가기
      </a>
    </div>
  ))

  return (
    <main className="container mx-auto mt-10 p-4">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          멋사컴에 오신 것을 환영합니다!
        </h1>
        <p className="text-xl mb-6">
          다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에
          따라 참여하고, 의견을 나누세요.
        </p>
        <a
          href="/"
          className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600"
        >
          커뮤니티 참여하기
        </a>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{cardItems}</div>
      </section>
    </main>
  )
}

export default Community
