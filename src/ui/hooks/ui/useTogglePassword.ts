import { useState } from 'react'

const useTogglePassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  return { showPassword, togglePasswordVisibility, showPasswordConfirm, togglePasswordConfirmVisibility }
}

export default useTogglePassword
