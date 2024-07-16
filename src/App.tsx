import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import router from "./routes"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"
import { Spinner } from "@components/spinner"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<Spinner.FullScrean />}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </React.Suspense>
    </QueryClientProvider>
  )
}

export default App
