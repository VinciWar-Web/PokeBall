interface AuthStorageState {
  token?: string
}

interface ParsedAuthorization {
  state?: AuthStorageState
}

export const getTokenFromStorage = () => {
  const raw = localStorage.getItem('authorization-storage')

  if (!raw) return ''

  try {
    const parsed: ParsedAuthorization = JSON.parse(raw)
    return parsed?.state?.token ?? ''
  } catch (error) {
    console.error('Error parsing authorization-storage:', error)
    return ''
  }
}
