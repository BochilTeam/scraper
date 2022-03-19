import got from 'got'
import { TebakKata } from './types'

export let tebakkatajson: TebakKata[]
export default async function tebakkata (): Promise<TebakKata> {
  if (!tebakkatajson) {
    tebakkatajson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json'
    ).json()
  }
  return tebakkatajson[
    Math.floor(Math.random() * tebakkatajson.length)
  ] as TebakKata
}
