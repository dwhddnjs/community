type BaseFetchParamTypes = {
  url: string
  method: string
  data?: string | FormData
  headers?: {
    [key: string]: string
  }
}

const baseFetch = async ({
  url,
  method,
  data,
  headers,
  ...option
}: BaseFetchParamTypes) => {
  let authorizationHeader: string | null
  const apiUrl = !url.startsWith("http")
    ? import.meta.env.VITE_API_URL + url
    : url

  const accessToken = localStorage.getItem("ACCESS_TOKEN")

  if (accessToken) {
    authorizationHeader = `Bearer ${accessToken}`
  } else {
    authorizationHeader = null
  }

  const request = {
    body: data,
    ...(authorizationHeader
      ? {
          headers: {
            Authorization: authorizationHeader,
            ...headers,
          },
        }
      : { headers }),
    method,
    ...option,
  }
  console.log("request: ", request)

  try {
    const res = await fetch(apiUrl, request)
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

const fetcher = (url: string) => {
  return baseFetch({
    url,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const postRequest = <T>(url: string, arg: T) => {
  return baseFetch({
    url,
    method: "POST",
    data: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const postFormRequest = (url: string, arg: FormData) => {
  return baseFetch({
    url,
    method: "POST",
    headers: undefined,
    data: arg,
  })
}

const patchRequest = <T>(url: string, arg: T) => {
  return baseFetch({
    url,
    method: "PATCH",
    data: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const putRequest = <T>(url: string, arg: T) => {
  return baseFetch({
    url,
    method: "PUT",
    data: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const deleteRequest = (url: string) => {
  return baseFetch({
    url,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export {
  fetcher,
  postRequest,
  postFormRequest,
  patchRequest,
  putRequest,
  deleteRequest,
}
