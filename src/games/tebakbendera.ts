import got from 'got'
import { TebakBendera } from './types'

export let tebakbenderajson: TebakBendera[]
export default async function tebakbendera (): Promise<TebakBendera> {
  if (!tebakbenderajson) {
    tebakbenderajson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera.json'
    ).json()
  }
  return tebakbenderajson[
    Math.floor(Math.random() * tebakbenderajson.length)
  ] as TebakBendera
}
