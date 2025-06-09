import type { Dispatch, SetStateAction, ChangeEvent } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface PasswordRule {
  message: string
  valid: boolean
}

interface PasswordErrors {
  minLength: PasswordRule
  specialChar: PasswordRule
  uppercase: PasswordRule
}

interface UseRegisterFormReturn {
  firstAndLastNames: string
  setFirstAndLastNames: Dispatch<SetStateAction<string>>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  confirmPassword: string
  setConfirmPassword: Dispatch<SetStateAction<string>>
  firstAndLastNamesError: string
  emailError: string
  passwordError: string
  confirmPasswordError: string
  passwordErrors: PasswordErrors
  validateForm: () => boolean
  isFormValid: boolean
}

const useRegisterForm = (): UseRegisterFormReturn => {
  const [t] = useTranslation('global')

  const [firstAndLastNames, setFirstAndLastNames] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [firstAndLastNamesError, setFirstAndLastNamesError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')

  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
    minLength: { message: t('helperText.minEightCharacters'), valid: false },
    specialChar: { message: t('helperText.minOneSpecialOrNumber'), valid: false },
    uppercase: { message: t('helperText.minOneUppercase'), valid: false },
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{4,}$/

  const minLengthRegex = /^.{8,}$/
  const specialCharRegex = /[0-9@!%]/
  const uppercaseRegex = /[A-Z]/

  const validatePassword = (value: string): boolean => {
    const newErrors: PasswordErrors = {
      minLength: {
        ...passwordErrors.minLength,
        valid: minLengthRegex.test(value),
      },
      specialChar: {
        ...passwordErrors.specialChar,
        valid: specialCharRegex.test(value),
      },
      uppercase: {
        ...passwordErrors.uppercase,
        valid: uppercaseRegex.test(value),
      },
    }
    setPasswordErrors(newErrors)
    return newErrors.minLength.valid && newErrors.specialChar.valid && newErrors.uppercase.valid
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
  }

  const validateForm = (): boolean => {
    let isValid = true

    if (!firstAndLastNames.trim()) {
      setFirstAndLastNamesError(t('helperText.thisFieldIsRequired'))
      isValid = false
    } else if (!nameRegex.test(firstAndLastNames.trim())) {
      setFirstAndLastNamesError(t('helperText.minFourLetters'))
      isValid = false
    } else {
      setFirstAndLastNamesError('')
    }

    if (!email.trim()) {
      setEmailError(t('helperText.thisFieldIsRequired'))
      isValid = false
    } else if (!emailRegex.test(email.trim())) {
      setEmailError(t('helperText.incorrectFormatExample@mail.com'))
      isValid = false
    } else {
      setEmailError('')
    }

    if (!password.trim()) {
      setPasswordError(t('helperText.thisFieldIsRequired'))
      isValid = false
    } else {
      setPasswordError('')
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError(t('helperText.thisFieldIsRequired'))
      isValid = false
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(t('helperText.passwordsMustMatch'))
      isValid = false
    } else {
      setConfirmPasswordError('')
    }

    return isValid
  }

  const isFormValid =
    emailRegex.test(email.trim()) &&
    nameRegex.test(firstAndLastNames.trim()) &&
    passwordErrors.minLength.valid &&
    passwordErrors.specialChar.valid &&
    passwordErrors.uppercase.valid &&
    confirmPassword === password

  return {
    firstAndLastNames,
    setFirstAndLastNames,
    email,
    setEmail,
    password,
    handlePasswordChange,
    confirmPassword,
    setConfirmPassword,
    firstAndLastNamesError,
    emailError,
    passwordError,
    confirmPasswordError,
    passwordErrors,
    validateForm,
    isFormValid,
  }
}

export default useRegisterForm
