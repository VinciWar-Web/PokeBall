import { Box, Container, Typography, useTheme } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const Error404 = () => {
  const theme = useTheme()
  return (
    <Container maxWidth="md" sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: 3
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2
      }}>
        <ErrorOutlineIcon sx={{ 
          fontSize: 80,
          color: theme.palette.error.main 
        }} />
        <Typography variant="h1" sx={{ 
          fontSize: '4rem',
          fontWeight: 700,
          color: theme.palette.error.main
        }}>
          404
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ mb: 2 }}>
        ¡Ups! Página no encontrada
      </Typography>

      <Typography variant="body1" sx={{ 
        maxWidth: '600px',
        mb: 4,
        color: theme.palette.text.secondary
      }}>
        La página que estás buscando no existe o ha sido movida. 
        <br />
        Por favor verifica la URL o navega usando los enlaces disponibles.
      </Typography>
    </Container>
  )
}

export default Error404