import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IUserStore {
  email: string
  name: string
  rol: string
  setUser: (data: Omit<IUserStore, 'setUser' | 'clearUser'>) => void
  clearUser: () => void
}

const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      email: '',
      name: '',
      rol: '',
      setUser: ({ email, name, rol }) => {
        set({ email, name, rol })
      },
      clearUser: () => {
        set({ email: '', name: '', rol: '' })
      }
    }),
    {
      name: 'user-storage',
    }
  )
)

export default useUserStore