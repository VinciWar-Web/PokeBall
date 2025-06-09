import type { IUserResponse } from '../../../common/interface/data/user.interfaces'
import { UserListModel } from '../../models/userListModel'

const userListAdapter = (json: IUserResponse): UserListModel  => {
    const userList = new UserListModel(
    json.name,
    json.email,
    json.img,
    json.rol,
    json.state,
    json.google,
    json.uid
  )

  return Object.assign({}, userList)
}

export default userListAdapter

