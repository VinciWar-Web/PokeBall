import { APP_ROUTES } from './router'

export const logoutUser = () => {
  ['language', 'authorization-storage', 'user-storage']
    .forEach(key => localStorage.removeItem(key));
  
  window.location.assign(APP_ROUTES.login)
}