import { Box } from '@mui/material'
import logoLogin from '../../common/assets/logoLogin.png'

const LogoLogin = () => {
  return (
    <Box>
      <img src={logoLogin} alt='logo' style={{ height: '50vh' }} />
    </Box>
  )
}

export default LogoLogin
