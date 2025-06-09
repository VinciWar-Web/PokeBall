import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { APP_ROUTES } from '../../common/utils/router'
import type { ReactNode } from 'react'
import DrawerLayout from '../components/DrawerLayout'

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { token } = useAuthStore()
  return token ? <DrawerLayout>{children}</DrawerLayout> : <Navigate to={APP_ROUTES.login} />
}

export default PrivateRoute
