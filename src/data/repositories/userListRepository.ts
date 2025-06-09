/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ROUTES } from '../../common/utils/router'
import FetchData from '../../common/utils/fetchData'
import type { IUserSuccessResponse } from '../../common/interface/data/user.interfaces'
import userListAdapter from '../adapters/in/userListAdapter'

export default class UserListRepository {
  /**
   * Retrieves a list of users from the API, with pagination.
   * 
   * @param page - The page number to fetch.
   * @param limit - The number of items per page.
   * 
   * @throws If the server returns an error with a 'msg' field, it throws an error with that message.
   * @throws If any other error occurs during the request, it throws an error with the message 'Failed to fetch users'.
   * 
   * @returns The list of users, with pagination data.
   */
  static async getAll(page: number, limit: number): Promise<IUserSuccessResponse> {
    try {
      const { data, status } = await new FetchData().GET<IUserSuccessResponse>(
        `${API_ROUTES.users}?page=${page}&limit=${limit}`
      )

      // If it is not a 200 and the response brings a msg, it throws it as a readable error.
      if (status !== 200 && 'msg' in data) {
        throw new Error((data as any).msg)
      }

      const adaptedResponse = {
        totalUsers: data.totalUsers,
        users: data.users.map((user) => userListAdapter(user))
      }

      return adaptedResponse as IUserSuccessResponse
    } catch (error) {
      console.error('UserListRepository.getAll Error:', error)
      throw new Error('Failed to fetch users')
    }
  }
}