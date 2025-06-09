import type { FC } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from '../../../../common/styles/constants/theme'

const Head : FC = () => {
  const [t] = useTranslation('global')

  return <Typography sx={{ ...styles.title, fontSize: '30px' }}>{t('title.userList')}</Typography>
}

export default Head
