export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <table className="border-collapse w-full table-fixed">
      <colgroup>
        <col className="w-[10%] sm:w-[10%]" />
        <col className="w-[60%] sm:w-[30%]" />
        <col className="w-[30%] sm:w-[15%]" />
        <col className="w-0 sm:w-[10%]" />
        <col className="w-0 sm:w-[10%]" />
        <col className="w-0 sm:w-[25%]" />
      </colgroup>
      <thead>
        <tr className="border-b border-solid border-gray-600">
          <th className="p-2 whitespace-nowrap font-semibold">번호</th>
          <th className="p-2 whitespace-nowrap font-semibold">제목</th>
          <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
          <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
            조회수
          </th>
          <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
            댓글수
          </th>
          <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
            작성일
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}
