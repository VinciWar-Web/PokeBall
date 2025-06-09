import { create } from 'zustand'

interface SpinnerState {
  showSpinner: boolean
  showSpinnerLogin: boolean
  startSpinner: () => void
  stopSpinner: () => void
  startSpinnerLogin: () => void
  stopSpinnerLogin: () => void
}

const useSpinnerStore = create<SpinnerState>((set) => ({
  showSpinner: false,
  showSpinnerLogin: false,
  startSpinner: () => set({ showSpinner: true }),
  stopSpinner: () => set({ showSpinner: false }),

  startSpinnerLogin: () => set({ showSpinnerLogin: true }),
  stopSpinnerLogin: () => set({ showSpinnerLogin: false }),
}))

export default useSpinnerStore
