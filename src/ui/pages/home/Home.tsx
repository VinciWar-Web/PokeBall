import { Box, Typography } from '@mui/material'
import welcomeImage from '../../../common/assets/welcome.webp'
import useUserStore from '../../store/useUserStore'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { email } = useUserStore()
  const [t] = useTranslation('global')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        textAlign: 'center',
      }}
    >
      <Typography 
        variant="h3"
        component="h1"
        sx={{
          mb: { xs: 2, sm: 4 },
          color: 'text.primary',
          fontWeight: 'medium',
          fontSize: {
            xs: '1.5rem',  // Mobile
            sm: '2rem',    // Tablet
            md: '2.5rem'   // Desktop
          },
          lineHeight: 1.2,
          wordBreak: 'break-word' // Evita overflow en nombres largos
        }}
      >
        {t('title.welcome')} {email}
      </Typography>

      <Box
        component="img"
        src={welcomeImage}
        alt="Bienvenido"
        sx={{
          width: { xs: '100%', sm: '80%', md: '500px' },
          maxWidth: '500px',
          height: 'auto',
        }}
      />
    </Box>
  )
}

export default Home