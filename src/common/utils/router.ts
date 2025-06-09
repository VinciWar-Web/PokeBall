// Defining types for app and API routes
type AppRoutes = {
  login: string
  home: string
  user: string
  pokemon: string
}

type ApiRoutes = {
  login: string
  users: string
  pokemons: string
}

// Navigation routes in the app
export const APP_ROUTES: Readonly<AppRoutes> = Object.freeze({
  // Public Routes
  login: '/',

  // Private Routes
  home: '/home',
  user: '/user',
  pokemon: '/pokemon',
})

// Routes for API endpoints
export const API_ROUTES: Readonly<ApiRoutes> = Object.freeze({
  login: '/auth/login',
  users: '/users',
  pokemons: '/pokemon',
})

