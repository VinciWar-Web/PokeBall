export interface IPokeResponse {
  name: string
  url: string
}
export interface IPokemonsSuccessResponse {
  count: number
  results: IPokeResponse[]
}