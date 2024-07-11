export const getImageUrl = (endPoint: string) => {
  const url = import.meta.env.VITE_API_URL
  return url + endPoint
}
