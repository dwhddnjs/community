import { useNavigate, useParams } from "react-router-dom"
import CommentList from "./comment-list"
import { usePost } from "@hooks/query/post-query"
import { useDeletePost } from "@hooks/mutation/post-mutation"
import { useUser } from "@hooks/zustand/use-user"
import { Button } from "@components/button"

function Detail() {
  const { _id } = useParams()
  const { data } = usePost(_id)
  const { mutate, isPending } = useDeletePost(_id)
  const { user } = useUser()
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
          <Button onClick={() => navigate(`/info/`)} disabled={isPending}>
            목록
          </Button>
          <Button
            bgColor="gray"
            disabled={isPending}
            onClick={() => navigate(`/info/${_id}/edit`)}
          >
            수정
          </Button>
          {data.item.user.name === user?.name && (
            <Button bgColor="red" disabled={isPending} onClick={() => mutate()}>
              삭제
            </Button>
          )}
        </div>
      </section>

      {/* 댓글 목록 */}
      <CommentList comments={data.item.replies} />
    </main>
  )
}

export default Detail
