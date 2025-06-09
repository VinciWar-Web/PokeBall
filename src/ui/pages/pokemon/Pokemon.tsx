import type { FC } from 'react'
import { Box } from '@mui/material'
import Head from './components/Head'
import TableGrid from './components/Table'

const Pokemon: FC = () => {
  return (
    <Box>
      <Head />
      <TableGrid />
    </Box>
  )
}

export default Pokemon
