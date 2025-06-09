import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IAuthPayload {
  token: string
}

interface IAuthState {
  token: string
  setAuthorization: (auth: IAuthPayload) => void
}

const useAuthStore = create<IAuthState>()(
  persist<IAuthState>(
    (set) => ({
      token: '',
      setAuthorization: ({ token }) => {
        set({ token })
      },
    }),
    {
      name: 'authorization-storage',
    }
  )
)

export default useAuthStore
