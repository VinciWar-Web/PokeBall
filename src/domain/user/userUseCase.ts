import type { IUserSuccessResponse } from '../../common/interface/data/user.interfaces'
import UserListRepository from '../../data/repositories/userListRepository'

export default class UserUseCase {
  /**
   * Fetches a list of users from the API, with pagination.
   * 
   * @param page - The page number to fetch.
   * @param limit - The number of items per page.
   * 
   * @throws If the server returns an error with a 'msg' field, it throws an error with that message.
   * @throws If any other error occurs during the request, it throws an error with the message 'Failed to fetch users'.
   * 
   * @returns The list of users, with pagination data.
   */
  async call(page: number, limit: number): Promise<IUserSuccessResponse> {
    return await UserListRepository.getAll(page, limit)
  }
}
