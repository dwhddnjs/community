export type PaginationTypes = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type UserTypes = {
  _id: number
  name: string
  profile?: ProfileTypes
}

export type ProfileTypes = {
  name: string
  originalname: string
  path: string
}

export type PostTypes = {
  //잡다한거 넣고 싶으면
  extra: any
  //안 팔아요
  seller_id: any
  _id: number
  content: string
  createdAt: string
  repliesCount?: number
  replies?: CommentType[]
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
  pagination?: PaginationTypes
}

export type Login = {
  createdAt: string
  email: string
  name: string
  profileImage: ProfileTypes
  token: {
    accessToken: string
    refreshToken: string
  }
  updatedAt: string
  _id: number
}
