/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { SxProps } from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  LinearProgress,
  TablePagination,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getRandomColor } from './helpers/getRandomColor'
import PokemonsUseCase from '../../../../domain/poke/pokemonsUseCase'
import type { IPokemonsSuccessResponse, IPokeResponse } from '../../../../common/interface/data/poke.interfaces'

interface Column {
  width: number
  label: string
  dataKey: keyof IPokeResponse
  numeric?: boolean
}

const TableGrid: FC = () => {
  const [t] = useTranslation('global')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [pokeList, setPokeList] = useState<IPokemonsSuccessResponse | null>(null)
  const { count = 0, results = [] } = pokeList || {}
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')) // md = 900px
  
  const columns: Column[] = [
    { width: 150, label: t('columnName.namePokemon'), dataKey: 'name' },
  ]

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paperStyles: SxProps = {
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  }

  const tableContainerStyles: SxProps = {
    width: '100%',
    overflowX: 'auto',
    '@media (max-width: 900px)': {
      '&': {
        display: 'block',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      },
      '&::-webkit-scrollbar': {
        height: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
      }
    }
  }

  const tableStyles: SxProps = {
    minWidth: isSmallScreen ? '800px' : '100%',
    '& .MuiTableCell-root': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  }

  const responsiveHeaderStyles: SxProps = {
    fontWeight: 'bold',
    fontSize: isSmallScreen ? '0.875rem' : 'inherit',
    padding: isSmallScreen ? '8px' : '16px',
  }

  const fetchData = async () => {
    const pokemonsUseCase = new PokemonsUseCase()
    setLoading(true)
    try {
      const data = await pokemonsUseCase.call(page, rowsPerPage)
      setPokeList(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage])

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Paper sx={paperStyles}>
        {loading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}

        <TableContainer sx={tableContainerStyles}>
          <Table stickyHeader aria-label="users table" sx={tableStyles}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.dataKey}
                    style={{ width: column.width }}
                    sx={responsiveHeaderStyles}
                  >
                    <Typography variant="subtitle2" noWrap>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((poke) => (
                <TableRow hover key={poke.url}>
                  {columns.map((column) => {
                    if (column.dataKey === 'name') {
                      const initial = poke.name.charAt(0).toUpperCase()
                      const color = getRandomColor(poke.name)
                      
                      return (
                        <TableCell key={column.dataKey}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Avatar sx={{ 
                              bgcolor: color, 
                              width: isSmallScreen ? 28 : 32, 
                              height: isSmallScreen ? 28 : 32 
                            }}>
                              {initial}
                            </Avatar>
                            <Typography variant="body2" noWrap>
                              {poke.name}
                            </Typography>
                          </Box>
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={Number(count)}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('label.itemsPerPagination')}
          sx={{
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: isSmallScreen ? '0.75rem' : '0.875rem'
            }
          }}
        />
      </Paper>
    </Box>
  )
}

export default TableGrid