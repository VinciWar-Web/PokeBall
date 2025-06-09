import { Alert, Slide, Snackbar } from '@mui/material'
import type { SlideProps } from '@mui/material'
import useSnackbarStore from '../store/useSnackbarStore'

const AlertSnackbar = () => {
  const { open, message, severity, closeSnackbar } = useSnackbarStore()

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction='up' />
  }

  return (
    <>
      <Snackbar
        open={open}
        onClose={closeSnackbar}
        slots={{ transition: SlideTransition }}
        key={severity}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={severity as 'success' | 'error'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AlertSnackbar
