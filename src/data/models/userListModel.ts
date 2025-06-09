import type { IUserResponse } from '../../common/interface/data/user.interfaces'

export class UserListModel implements IUserResponse {
  name: string
  email: string
  img: string
  rol: string
  state: boolean
  google: boolean
  uid: string

  constructor(
    name: string, 
    email: string, 
    img: string, 
    rol: string, 
    state: boolean, 
    google: boolean, 
    uid: string
  ) {
    this.name = name
    this.email = email
    this.img = img
    this.rol = rol
    this.state = state
    this.google = google
    this.uid = uid
  }
}