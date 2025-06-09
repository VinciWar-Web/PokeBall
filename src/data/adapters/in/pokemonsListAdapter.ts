import type { IPokeResponse } from '../../../common/interface/data/poke.interfaces'
import { PokemonsListModel } from '../../models/pokemonsListModel'

const pokemonsListAdapter = (json: IPokeResponse): PokemonsListModel  => {
    const pokeList = new PokemonsListModel(
    json.name,
    json.url
  )

  return Object.assign({}, pokeList)
}

export default pokemonsListAdapter

