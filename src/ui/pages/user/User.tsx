import type { FC } from 'react'
import { Box } from '@mui/material'
import TableGrid from './components/Table'
import Head from './components/Head.js'

const User: FC = () => {
  return (
    <Box>
      <Head />
      <TableGrid />
    </Box>
  )
}

export default User
