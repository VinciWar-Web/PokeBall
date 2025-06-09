import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

const Head: FC = () => {
  const [t] = useTranslation('global')
  return (
    <Box>
      {/* Title */}
      <Typography sx={{ fontWeight: 700, fontSize: '25px' }}>{t('title.login')}</Typography>
    </Box>
  )
}

export default Head
