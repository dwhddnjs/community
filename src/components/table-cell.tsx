import { useNavigate } from "react-router-dom"
import { PostTypes } from "types"

interface TableCellProps
  extends Pick<PostTypes, "repliesCount" | "views" | "title" | "createdAt"> {
  id: number
  username: string
}

export const TableCell = ({
  repliesCount,
  views,
  title,
  id,
  username,
  createdAt,
}: TableCellProps) => {
  const navigate = useNavigate()

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">{id}</td>
      <td
        className="p-2 truncate indent-4 cursor-pointer"
        onClick={() => navigate(`/info/${id}`)}
      >
        {title}
      </td>
      <td className="p-2 text-center truncate">{username}</td>
      <td className="p-2 text-center hidden sm:table-cell">{views}</td>
      <td className="p-2 text-center hidden sm:table-cell">{repliesCount}</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {createdAt}
      </td>
    </tr>
  )
}
