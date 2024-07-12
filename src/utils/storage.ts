export function setLocalStorage(key: string, token: string) {
  if (token) {
    return localStorage.setItem(key, token)
  }
}

export function getLocalStorage(key: string) {
  if (key) {
    return localStorage.getItem(key)
  }
}

export function removeLocalStorage(key: string) {
  if (key) {
    return localStorage.removeItem(key)
  }
}
