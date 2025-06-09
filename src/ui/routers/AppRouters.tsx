import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { APP_ROUTES } from '../../common/utils/router'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

import Error404 from '../pages/Error404'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import User from '../pages/user/User'
import Pokemon from '../pages/pokemon/Pokemon'

const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path={APP_ROUTES.login}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        
        {/* Private Routes */}
        <Route
          path={APP_ROUTES.home}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.user}
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.pokemon}
          element={
            <PrivateRoute>
              <Pokemon />
            </PrivateRoute>
          }
        />
        {/* Ruta 404 */}
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouters
