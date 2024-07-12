import { Button } from "@components/button"
import { Table } from "@components/table"
import { TableCell } from "@components/table-cell"
import { usePosts } from "@hooks/query/post-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PostTypes } from "types"

const List = () => {
  const [page, setPage] = useState(1)

  const { data } = usePosts(page)
  console.log("data: ", data)
  const navigate = useNavigate()

  const onAddPage = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    setPage((state) => state + 1)
  }

  if (!data) {
    return null
  }

  const tableCell = data.item?.map((item: PostTypes) => (
    <TableCell
      key={item._id}
      id={item._id}
      username={item.user.name}
      title={item.title}
      views={item.views}
      repliesCount={item.repliesCount}
      createdAt={item.createdAt}
    />
  ))

  const paginationBtn = Array.from({ length: 5 }, (_, i) => i + 1).map(
    (value) => (
      <li className="text-bold text-blue-700" onClick={onAddPage}>
        <a href="/info?page=1">{value}</a>
      </li>
    )
  )

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <form
          onSubmit={(event) => {
            event.preventDefault()
            location.href = ""
          }}
        >
          <input
            className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
            type="text"
            name="keyword"
          />
          <Button type="submit">검색</Button>
        </form>

        <Button bgColor="gray" onClick={() => navigate("/info/new")}>
          글작성
        </Button>
      </div>
      <section className="pt-10">
        <Table>{tableCell}</Table>
        <hr />

        {/* 페이지네이션 */}
        <div>
          <ul className="flex justify-center gap-3 m-4">{paginationBtn}</ul>
        </div>
      </section>
    </main>
  )
}

export default List
