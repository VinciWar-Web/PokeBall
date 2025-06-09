/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import type { FC, JSX } from 'react'
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
  Chip,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import UserUseCase from '../../../../domain/user/userUseCase'
import type { IUserResponse, IUserSuccessResponse } from '../../../../common/interface/data/user.interfaces'
import { getRandomColor } from './helpers/getRandomColor'

interface Column {
  width: number
  label: string
  dataKey: keyof IUserResponse
  numeric?: boolean
}

const TableGrid: FC = () => {
  const [t] = useTranslation('global')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [userList, setUserList] = useState<IUserSuccessResponse | null>(null)
  const { totalUsers = 0, users = [] } = userList || {}
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')) // md = 900px
  
  const columns: Column[] = [
    { width: 150, label: t('columnName.firstLastNames'), dataKey: 'name' },
    { width: 200, label: t('columnName.email'), dataKey: 'email' },
    { width: 150, label: t('columnName.role'), dataKey: 'rol' },
    { width: 100, label: t('columnName.status'), dataKey: 'state' },
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
    const userUseCase = new UserUseCase()
    setLoading(true)
    try {
      const data = await userUseCase.call(page, rowsPerPage)
      setUserList(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage])

  const formatStatus = (state: boolean): JSX.Element => {
    return (
      <Chip 
        label={state ? t('text.active') : t('text.inactive')}
        color={state ? 'success' : 'error'}
        size="small"
        sx={{ 
          minWidth: '80px',
          fontSize: isSmallScreen ? '0.75rem' : '0.8125rem'
        }}
      />
    )
  }

  const formatRole = (rol: string): string => {
    const rolesMap: Record<string, string> = {
      'ADMIN_ROLE': t('text.admin'),
      'USER_ROLE': t('text.user'),
      'SALES_ROLE': t('text.sales')
    }
    return rolesMap[rol] || rol
  }

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
              {users.map((user) => (
                <TableRow hover key={user.uid}>
                  {columns.map((column) => {
                    if (column.dataKey === 'name') {
                      const initial = user.name.charAt(0).toUpperCase()
                      const color = getRandomColor(user.name)
                      
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
                              {user.name}
                            </Typography>
                          </Box>
                        </TableCell>
                      )
                    }

                    if (column.dataKey === 'state') {
                      return (
                        <TableCell key={column.dataKey}>
                          {formatStatus(user.state)}
                        </TableCell>
                      )
                    }

                    if (column.dataKey === 'rol') {
                      return (
                        <TableCell key={column.dataKey}>
                          <Typography variant="body2" noWrap>
                            {formatRole(user.rol)}
                          </Typography>
                        </TableCell>
                      )
                    }

                    return (
                      <TableCell key={column.dataKey}>
                        <Typography variant="body2" noWrap>
                          {user[column.dataKey]}
                        </Typography>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={Number(totalUsers)}
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