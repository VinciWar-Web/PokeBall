import type { IPokeResponse } from '../../common/interface/data/poke.interfaces'

export class PokemonsListModel implements IPokeResponse {
  name: string
  url: string

  constructor(
    name: string, 
    url: string, 
  ) {
    this.name = name
    this.url = url
  }
}