
import loginAdapter from '../adapters/out/loginAdapter'
import { API_ROUTES } from '../../common/utils/router'
import FetchData from '../../common/utils/fetchData'
import type { 
  IAuthSuccessResponse, 
  ILoginPayload 
} from '../../common/interface/data/auth.interfaces'

export default class LoginRepository {
  /**
   * Logins a user and returns the user data and authentication token.
   * 
   * @param payload - The user data to be sent in the request body.
   * @throws If the server returns an error with a 'msg' field, it throws an error with that message.
   * @throws If any other error occurs during the request, it throws an error with the message 'Authentication failed'.
   * @returns The user data and authentication token.
   */
  static async login(payload: ILoginPayload): Promise<IAuthSuccessResponse> {
    
    try {
      const { data, status } = await new FetchData().LOGIN(`${API_ROUTES.login}`, loginAdapter(payload))

      // If it is not a 200 and the response brings a msg, it throws it as a readable error.
      if (status !== 200 && 'msg' in data) {
        throw new Error(data.msg)
      }

      return data as IAuthSuccessResponse
    } catch (error) {
      console.error('LoginRepository.login Error:', error)
      throw new Error('Authentication failed')
    }
  }
}