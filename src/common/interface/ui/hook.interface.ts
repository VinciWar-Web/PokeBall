import type { Dispatch, SetStateAction } from 'react'

export interface IUseLoginForm {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  emailError: string
  setEmailError: Dispatch<SetStateAction<string>>
  passwordError: string
  setPasswordError: Dispatch<SetStateAction<string>>
  validateForm: () => boolean
  isFormValid: boolean
}