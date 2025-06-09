
import type { IAuthSuccessResponse, ILoginPayload } from '../../common/interface/data/auth.interfaces'
import LoginRepository from '../../data/repositories/loginRepository'

export default class LoginUseCase {
  /**
   * Calls the login repository with the given payload and returns the response.
   * @param payload - The user data to be sent in the request body.
   * @returns The user data and authentication token.
   */
  async call(payload: ILoginPayload): Promise<IAuthSuccessResponse> {
    return await LoginRepository.login(payload)
  }
}