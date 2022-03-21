import got from 'got'
import { TebakKimia } from './types'

export let tebakkimiajson: TebakKimia[]
export default async function tebakkimia (): Promise<TebakKimia> {
  if (!tebakkimiajson) {
    tebakkimiajson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json'
    ).json()
  }
  return tebakkimiajson[
    Math.floor(Math.random() * tebakkimiajson.length)
  ] as TebakKimia
}
