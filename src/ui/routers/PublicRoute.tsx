import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { APP_ROUTES } from '../../common/utils/router'
import type { ReactNode } from 'react'

interface PublicRouteProps {
  children: ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { token } = useAuthStore()
  return token ? <Navigate to={APP_ROUTES.home} /> : children
}

export default PublicRoute
