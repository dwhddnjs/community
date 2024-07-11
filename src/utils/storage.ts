export function setLocalStorage(key: string, token: string) {
  if (token) {
    return localStorage.setItem(key, token)
  }
}

export function getLocalStorage(key: string) {
  return localStorage.getItem(key)
}
