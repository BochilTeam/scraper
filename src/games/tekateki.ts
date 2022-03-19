import got from 'got'
import { TekaTeki } from './types'

export let tekatekijson: TekaTeki[]
export default async function tekateki (): Promise<TekaTeki> {
  if (!tekatekijson) {
    tekatekijson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json'
    ).json()
  }
  return tekatekijson[
    Math.floor(Math.random() * tekatekijson.length)
  ] as TekaTeki
}
