/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { logoutUser } from './logoutUser'
import type { AuthResponse, ILoginPayload } from '../interface/data/auth.interfaces'
import { getTokenFromStorage } from './getAuthLocalStorage'

const urlBase = import.meta.env.VITE_API_URL_BASE
const urlBasePokemon = import.meta.env.VITE_API_URL_BASE_POKEMONS

export default class FetchData {
  async LOGIN(endpoint: string, payload: ILoginPayload) {
    try {
      const { data, status } = await axios.post<AuthResponse>(
        `${urlBase}${endpoint}`,
        payload
      )

      return { data, status }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async GET<T>(endpoint: string): Promise<{ data: T; status: number }> {
    const token = getTokenFromStorage()

    try {
      const { data, status } = await axios.get<T>(
        `${urlBase}${endpoint}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-token': token ?? '',
          },
        }
      )

      return { data, status }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
          logoutUser()
      }
      throw new Error(error)
    }
  }

  async GETnoTOKEN<T>(endpoint: string): Promise<{ data: T; status: number }> {

    try {
      const { data, status } = await axios.get<T>(
        `${urlBasePokemon}${endpoint}`
      )

      return { data, status }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
          logoutUser()
      }
      throw new Error(error)
    }
  }
}