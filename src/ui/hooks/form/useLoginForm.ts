import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { IUseLoginForm } from '../../../common/interface/ui/hook.interface'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6
const useLoginForm = (): IUseLoginForm => {
  const [t] = useTranslation('global')

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  // Función para validación el formulario antes de enviar
  const validateForm = (): boolean => {
    let isValid = true

    if (!email.trim()) {
      setEmailError(t('helperText.thisFieldIsRequired'))
      isValid = false
    } else if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError(t('helperText.incorrectFormatExample@mail.com'))
      isValid = false
    } else {
      setEmailError('')
    }

    if (!password.trim()) {
      setPasswordError(t('helperText.thisFieldIsRequired'))
      isValid = false
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(t('helperText.minCharacters', { count: MIN_PASSWORD_LENGTH }))
      isValid = false
    } else {
      setPasswordError('')
    }

    return isValid
  }

  const isFormValid: boolean = EMAIL_REGEX.test(email.trim()) && password.trim().length >= MIN_PASSWORD_LENGTH

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    validateForm,
    isFormValid,
  }
}

export default useLoginForm