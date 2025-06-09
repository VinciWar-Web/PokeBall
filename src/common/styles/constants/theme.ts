import type { SxProps, Theme } from '@mui/material'

interface Gradient {
  purpleBlue: string
}

interface Styles {
  title: SxProps<Theme>;
  textFieldInput: SxProps<Theme>
  textFieldInputSecondary: SxProps<Theme>
  buttonPrimary: SxProps<Theme>
  buttonSecondary: SxProps<Theme>
  buttonLogin: (isFormValid: boolean, gradient: Gradient) => SxProps<Theme>
}

export const styles: Styles = {
  title: {
    fontWeight: 700,
    color: '#212121',
    marginTop: '20px',
    marginBottom: '20px',
  },

  textFieldInput: {
    width: '496px',
    marginBottom: '15px',
    '& label': { color: '#141414' },
    '& label.Mui-focused': { color: '#141414' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#F46700' },
      '&:hover fieldset': { borderColor: 'darkorange' },
      '&.Mui-focused fieldset': { borderColor: 'darkorange' },
    },
  },

  textFieldInputSecondary: {
    width: '100%',
    marginBottom: '10px',
    '& label': { color: '#141414' },
    '& label.Mui-focused': { color: '#141414' },
    '& .MuiOutlinedInput-root': {
      position: 'relative',
      '& fieldset': {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderImage: 'linear-gradient(to right, #00B8FF, #0008D3) 1',
        borderRadius: '8px',
      },
      '&:hover fieldset': {
        borderImage: 'linear-gradient(to right, #00B8FF, #0008D3) 1',
        borderRadius: '8px',
      },
      '&.Mui-focused fieldset': {
        borderImage: 'linear-gradient(to right, #00B8FF, #0008D3) 1',
        borderRadius: '8px',
      },
    },
  },

  buttonPrimary: {
    background: 'linear-gradient(90deg, #9C27B0 0%, #2196F3 100%)',
    color: 'white',
    fontWeight: 'bold',
    px: 3,
    py: 1,
    borderRadius: '8px',
    textTransform: 'none',
    '&:hover': {
      background: 'linear-gradient(90deg, #7B1FA2 0%, #1976D2 100%)',
    },
  },

  buttonSecondary: {
    color: '#000000',
    fontWeight: 'bold',
    px: 3,
    py: 1,
    borderRadius: '8px',
    textTransform: 'none',
    position: 'relative',
    border: 'none',
    background: 'transparent',
    zIndex: 0,
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      padding: '2px',
      borderRadius: '8px',
      background: 'linear-gradient(to right, #BA29D2, #0880C7)',
      WebkitMask: `
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0)
      `,
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    },
    '&:hover': {
      backgroundColor: '#f3e5f5',
      '&::before': {
        opacity: 0.8,
      },
    },
  },

  buttonLogin: (isFormValid: boolean, gradient: Gradient): SxProps<Theme> => ({
    width: '100%',
    height: '60px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: isFormValid ? '#FBFBFB' : '#000',
    backgroundColor: isFormValid ? gradient.purpleBlue : 'white',
    borderRadius: '8px',
    textTransform: 'capitalize',
    border: isFormValid ? 'none' : '2px solid white',
    '&:hover': {
      backgroundColor: isFormValid ? gradient.purpleBlue : 'white',
    },
  }),
};
