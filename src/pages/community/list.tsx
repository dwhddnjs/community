import { Button } from "@components/button"
import { Search } from "@components/search"
import { Table } from "@components/table"
import { TableCell } from "@components/table-cell"
import { usePosts } from "@hooks/query/post-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PostTypes } from "types"

const List = () => {
  const [params, setParams] = useState({
    page: 1,
    keyword: "",
    limit: 10,
  })

  const { data, refetch } = usePosts(params)
  const navigate = useNavigate()

  const onAddPage = (e: React.MouseEvent<HTMLLIElement>, value: number) => {
    e.preventDefault()
    setParams((state) => ({
      ...state,
      page: value,
    }))
  }

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      keyword: e.target.value,
    })
  }
  const onResetKeyword = () => {
    setParams({
      page: 1,
      keyword: "",
      limit: 10,
    })
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
      <li
        className="text-bold text-blue-700"
        onClick={(e) => onAddPage(e, value)}
      >
        <a href="/info">{value}</a>
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
        <Search
          onChangeKeyword={onChangeKeyword}
          keyword={params.keyword}
          refetch={refetch}
          onResetKeyword={onResetKeyword}
        />
        <Button bgColor="gray" onClick={() => navigate("/info/new")}>
          글작성
        </Button>
      </div>
      <section className="pt-10">
        <Table>{tableCell}</Table>
        <hr />
        <div>
          <ul className="flex justify-center gap-3 m-4">{paginationBtn}</ul>
        </div>
      </section>
    </main>
  )
}

export default List
