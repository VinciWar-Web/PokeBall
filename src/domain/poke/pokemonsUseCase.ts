import type { IPokemonsSuccessResponse } from '../../common/interface/data/poke.interfaces'
import PokemonsListRepository from '../../data/repositories/pokemonsListRepository'

export default class PokemonsUseCase {
  /**
   * Fetches a list of pokemons from the API with pagination.
   * 
   * @param page - The current page number for pagination offset.
   * @param limit - The number of pokemons to fetch per page.
   * 
   * @throws If the server returns an error with a 'msg' field, it throws an error with that message.
   * @throws If any other error occurs during the request, it throws an error with the message 'Failed to fetch pokemons'.
   * 
   * @returns The list of pokemons, with pagination data.
   */
  async call(page: number, limit: number): Promise<IPokemonsSuccessResponse> {
    return await PokemonsListRepository.getAll(page, limit)
  }
}
