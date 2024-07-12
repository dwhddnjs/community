import { Button } from "@components/button"

interface SearchProps {
  onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void
  keyword: string
  refetch: () => void
  onResetKeyword: () => void
}

export const Search = ({
  onChangeKeyword,
  keyword,
  refetch,
  onResetKeyword,
}: SearchProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        refetch()
        onResetKeyword()
      }}
    >
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        name="keyword"
        onChange={onChangeKeyword}
        value={keyword}
      />
      <Button type="submit">검색</Button>
    </form>
  )
}
