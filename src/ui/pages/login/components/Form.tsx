import type { FC, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { width } from '../../../../common/styles/constants/spaces'
import { gradient } from '../../../../common/styles/constants/colors'
import { VisibilityOff, Visibility, Email } from '@mui/icons-material'
import useTogglePassword from '../../../hooks/ui/useTogglePassword'
import useLoginForm from '../../../hooks/form/useLoginForm'
import useAuthHandler from '../../../hooks/auth/useAuthHandler'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import { styles } from '../../../../common/styles/constants/theme'

const Form: FC = () => {
  const [t] = useTranslation('global')

  const {
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
  } = useLoginForm()

  const { handleSubmit } = useAuthHandler(
    validateForm,
    email,
    password,
    setEmailError,
    setPasswordError
  )

  const { showPassword, togglePasswordVisibility } = useTogglePassword()

  return (
    <Box sx={{ width: width.textFieldLogin }}>
      <TextField
        id="email"
        label={t('label.mail')}
        variant="outlined"
        value={email}
        error={!!emailError}
        helperText={emailError || ' '}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Email />
              </InputAdornment>
            ),
          },
        }}
        sx={styles.textFieldInput}
      />

      <TextField
        id="password"
        label={t('label.password')}
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        value={password}
        error={!!passwordError}
        helperText={passwordError || ' '}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={styles.textFieldInput}
      />

      <Box
        sx={{
          width: width.textFieldLogin,
          borderRadius: '8px',
          background: gradient.purpleBlue,
          padding: '3px',
        }}
      >
        <Button sx={styles.buttonLogin(isFormValid, gradient)} onClick={handleSubmit}>
          {t('button.login')}
        </Button>
      </Box>
    </Box>
  )
}

export default Form
