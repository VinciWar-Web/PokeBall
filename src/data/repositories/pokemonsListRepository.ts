/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ROUTES } from '../../common/utils/router'
import FetchData from '../../common/utils/fetchData'
import type { IPokemonsSuccessResponse } from '../../common/interface/data/poke.interfaces';
import pokemonsListAdapter from '../adapters/in/pokemonsListAdapter';

export default class PokemonsListRepository {
/**
 * Fetches a list of pokemons from the API with pagination.
 *
 * @param page - The current page number for pagination offset.
 * @param limit - The number of pokemons to fetch per page.
 * @returns A promise that resolves to an IPokemonsSuccessResponse containing
 *          the total count of pokemons and a list of adapted pokemon results.
 * @throws Will throw an error if the response status is not 200 or if there is 
 *         a network or parsing error.
 */
  static async getAll(page: number, limit: number): Promise<IPokemonsSuccessResponse> {
    try {
      const { data, status } = await new FetchData().GETnoTOKEN<IPokemonsSuccessResponse>(
        `${API_ROUTES.pokemons}?offset=${page}&limit=${limit}`
      )

      // If it is not a 200 and the response brings a msg, it throws it as a readable error.
      if (status !== 200 && 'msg' in data) {
        throw new Error((data as any).msg)
      }

      const adaptedResponse = {
        count: data.count,
        results: data.results.map((poke) => pokemonsListAdapter(poke))
      }

      return adaptedResponse as IPokemonsSuccessResponse
    } catch (error) {
      console.error('pokemonsListRepository.getAll Error:', error)
      throw new Error('Failed to fetch users')
    }
  }
}