import Layout from "@components/layout"
import Community from "@pages/community"
import CommentList from "@pages/community/comment-list"
import Detail from "@pages/community/detail"
import Edit from "@pages/community/edit"
import List from "@pages/community/list"
import New from "@pages/community/new"
import Error from "@pages/Error"
import Login from "@pages/user/login"
import Signup from "@pages/user/sign-up"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Community />,
      },
      {
        path: ":type",
        element: <List />,
      },
      {
        path: ":type/:_id",
        element: <Detail />,
        children: [
          {
            index: true,
            element: <CommentList />,
          },
        ],
      },
      {
        path: ":type/new",
        element: <New />,
      },
      {
        path: ":type/:_id/edit",
        element: <Edit />,
      },
      {
        path: "user/login",
        element: <Login />,
      },
      {
        path: "user/signup",
        element: <Signup />,
      },
    ],
  },
])

export default router
