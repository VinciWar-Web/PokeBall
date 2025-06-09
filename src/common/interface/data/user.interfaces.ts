export interface IUserResponse {
  name: string
  email: string
  img: string
  rol: string
  state: boolean
  google: boolean
  uid: string
}
export interface IUserSuccessResponse {
  totalUsers: number
  users: IUserResponse[]
}