import type { FC } from 'react'
import { Box } from '@mui/material'
import Head from './components/Head'
import Form from './components/Form'
import LogoLogin from '../../components/LogoLogin'

const Login: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Imagen */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'end',
          alignItems: 'center',
          marginRight: { md: '80px' },
          width: '100%',
        }}
      >
        <LogoLogin />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '95vh',
          marginLeft: '80px',
          marginRight: '180px',
        }}
      >
        <Box>
          {/* Titles */}
          <Head />

          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px', width: '480px' }}>
            {/* Inputs */}
            <Form />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
