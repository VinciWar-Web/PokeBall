import type { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import LoginUseCase from '../../../domain/login/loginUseCase'
import useSpinnerStore from '../../store/useSpinnerStore'
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';

interface UseAuthHandler {
  handleSubmit: () => Promise<void>;
}

const useAuthHandler = (
  validateForm: () => boolean,
  email: string,
  password: string,
  setEmailError: Dispatch<SetStateAction<string>>,
  setPasswordError: Dispatch<SetStateAction<string>>
): UseAuthHandler => {
  const [t] = useTranslation('global')
  const { setAuthorization } = useAuthStore()
  const { setUser } = useUserStore()
  const { startSpinnerLogin, stopSpinnerLogin } = useSpinnerStore()

  const handleSubmit = async () => {
    if (!validateForm()) return

    startSpinnerLogin()

    try {
      const loginUseCase = new LoginUseCase()

      const loginResponse = await loginUseCase.call({ email, password })
      const { token, user  } = loginResponse

      setAuthorization({ token })
      setUser({ email: user.email, name: user.name, rol: user.rol })

    } catch (error) {
      console.error('Login error:', error)
      setEmailError(t('helperText.theDataNotMatch'))
      setPasswordError(t('helperText.theDataNotMatch'))
    } finally {
      stopSpinnerLogin()
    }
  }

  return { handleSubmit }
}

export default useAuthHandler
