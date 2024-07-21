import { useDeleteComment } from "@hooks/mutation/comment-mutation"
import { useUser } from "@hooks/zustand/use-user"
import { getImageUrl } from "@utils/function"
import { Link, useParams } from "react-router-dom"
import { CommentType } from "types"

interface CommentItemProps {
  comment: CommentType
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  console.log("comment: ", comment)
  const { _id } = useParams()
  const { mutate } = useDeleteComment(_id, comment?._id)
  const { user } = useUser()

  const onRemoveComment = () => {
    mutate()
  }

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          src={
            comment?.user?.profile
              ? getImageUrl(comment?.user?.profile?.path)
              : "http://api.fesp.shop/files/00-sample/user-muzi.webp"
          }
          alt=""
        />
        <Link to="" className="text-orange-400">
          {comment?.user?.name}
        </Link>
        <time className="ml-auto text-gray-500" dateTime="2024.07.02 14:11:22">
          {comment?.createdAt}
        </time>
      </div>
      <pre className="whitespace-pre-wrap text-sm">{comment?.content}</pre>
      {comment?.user?.name === user?.name && (
        <div onClick={onRemoveComment} className="flex justify-end">
          <span className="text-xs text-red-500">삭제</span>
        </div>
      )}
    </div>
  )
}
