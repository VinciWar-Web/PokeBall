// Tipos para autenticación
export interface ILoginPayload {
  email: string
  password: string
}

export interface IUser {
  name: string
  email: string
  img: string
  rol: string
  state: boolean
  google: boolean
  uid: string
}

export interface IAuthSuccessResponse {
  user: IUser
  token: string
}

export interface IAuthErrorResponse {
  msg: string
}

export type AuthResponse = IAuthSuccessResponse | IAuthErrorResponse