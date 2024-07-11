export type PaginationTypes = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type UserTypes = {
  _id: number
  name: string
  profile: {
    name: string
    originalname: string
    path: string
  }
}

export type PostTypes = {
  extra: any
  seller_id: any
  _id: number
  content: string
  createdAt: string
  repliesCount: number
  title: string
  type: string
  updatedAt: string
  user: UserTypes
  views: number
}

export type CommentType = {
  _id: number
  content: string
  createdAt: string
  updatedAt: string
  user: UserTypes
}

export type ResponseTypes<T> = {
  ok: number
  item: T
  pagination: PaginationTypes
}
