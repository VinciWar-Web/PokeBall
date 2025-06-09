import { CircularProgress, Box } from '@mui/material'
import useSpinnerStore from '../store/useSpinnerStore'
import logo from '../../common/assets/logo.png'

const Spinner = () => {
  const { showSpinner, showSpinnerLogin } = useSpinnerStore()

  // If none is active, nothing is rendered.
  if (!showSpinner && !showSpinnerLogin) return null

  // Determine the background according to the type of spinner
  const backgroundColor = showSpinnerLogin
    ? 'rgba(255, 255, 255, 1)'
    : 'rgba(0, 0, 0, 0.8)'

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <svg width={0} height={0}>
        <defs>
          <linearGradient id='my_gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#BA29D2' />
            <stop offset='100%' stopColor='#0880C7' />
          </linearGradient>
        </defs>
      </svg>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component='img'
          src={logo}
          alt='Logo'
          sx={{
            position: 'absolute',
            width: '100px',
            zIndex: 2,
          }}
        />
        <CircularProgress
          size={190}
          sx={{
            color: 'transparent',
            '& .MuiCircularProgress-circle': {
              stroke: 'url(#my_gradient)',
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default Spinner
