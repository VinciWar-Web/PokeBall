import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, MenuItem } from '@mui/material'
import type { FC } from 'react'
import type { SelectChangeEvent } from '@mui/material'
import usFlag from '../../common/assets/icon/us.png'
import esFlag from '../../common/assets/icon/es.png'

export const LanguageSelect: FC =  () => {
  const { i18n } = useTranslation('global')
  const [language, setLanguage] = useState(i18n.language)

  // Load saved language on startup
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es'
    i18n.changeLanguage(savedLanguage)
    setLanguage(savedLanguage)
  }, [i18n])

  // Función para cambiar el idioma
  const handleChange = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value
    setLanguage(lang)
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <Select
      value={language}
      onChange={handleChange}
      sx={{
        marginRight: '20px',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '& .MuiSelect-select': { padding: 0 },
      }}
    >
      <MenuItem value='es'>
        <img src={esFlag} alt='Es' style={{ width: '30px', marginRight: '10px' }} />
      </MenuItem>
      <MenuItem value='en'>
        <img src={usFlag} alt='Us' style={{ width: '30px', marginRight: '10px' }} />
      </MenuItem>
    </Select>
  )
}
