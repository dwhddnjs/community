import { useNavigate, useParams } from "react-router-dom"
import CommentList from "./comment-list"
import { usePost } from "@hooks/query/post-query"
import { useDeletePost } from "@hooks/mutation/post-mutation"

function Detail() {
  const { _id } = useParams()
  const { data } = usePost(_id)
  const { mutate } = useDeletePost(_id)
  const navigate = useNavigate()

  if (!data) {
    return null
  }

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">
          {`제목 : ${data.item.title}`}
        </div>
        <div className="text-right text-gray-400">{`작성자 : ${data.item.user.name}`}</div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {data.item.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <button
            type="button"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() => navigate(`/info/`)}
          >
            목록
          </button>
          <button
            type="button"
            className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() => navigate(`/info/${_id}/edit`)}
          >
            수정
          </button>
          <button
            type="button"
            className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() => mutate()}
          >
            삭제
          </button>
        </div>
      </section>

      {/* 댓글 목록 */}
      <CommentList comments={data.item.replies} />
    </main>
  )
}

export default Detail
