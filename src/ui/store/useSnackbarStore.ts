import { create } from 'zustand'

type Severity = 'success' | 'error' | ''

interface SnackbarState {
  open: boolean
  message: string
  severity: Severity
  showSnackbarSuccess: (message: string) => void
  showSnackbarError: (message: string) => void
  closeSnackbar: () => void
}

const useSnackbarStore = create<SnackbarState>((set) => {
  let timeoutId: ReturnType<typeof setTimeout>

  const showSnackbar = (message: string, severity: Severity) => {
    set({ open: false })
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      set({ open: true, message, severity })
    }, 50)
  }

  return {
    open: false,
    message: '',
    severity: '',
    showSnackbarSuccess: (message: string) => showSnackbar(message, 'success'),
    showSnackbarError: (message: string) => showSnackbar(message, 'error'),
    closeSnackbar: () => set({ open: false, message: '' }),
  }
})

export default useSnackbarStore
