import type { ILoginPayload } from '../../common/interface/data/auth.interfaces'

export class LoginModel implements ILoginPayload {
  email: string
  password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
}