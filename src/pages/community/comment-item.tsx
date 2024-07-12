import { getImageUrl } from "@utils/function"
import { CommentType } from "types"

interface CommentItemProps {
  comment: CommentType
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          src={
            comment.user.profile
              ? getImageUrl(comment.user.profile.path)
              : "http://api.fesp.shop/files/00-sample/user-muzi.webp"
          }
          alt=""
        />
        <a href="" className="text-orange-400">
          {comment.user.name}
        </a>
        <time className="ml-auto text-gray-500" dateTime="2024.07.02 14:11:22">
          {comment.createdAt}
        </time>
      </div>
      <pre className="whitespace-pre-wrap text-sm">{comment.content}</pre>
    </div>
  )
}
