
import type { ILoginPayload } from '../../../common/interface/data/auth.interfaces'
import { LoginModel } from '../../models/loginModel'

const loginAdapter = (json: ILoginPayload): LoginModel => {
  return new LoginModel(json.email, json.password)
}

export default loginAdapter