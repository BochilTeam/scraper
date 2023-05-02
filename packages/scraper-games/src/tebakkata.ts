import got from 'got'
import { TebakKata, TebakKataSchema } from '../types/index.js'

export let tebakkatajson: TebakKata[]
export default async function tebakkata (): Promise<TebakKata> {
  if (!tebakkatajson) {
    tebakkatajson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json'
    ).json()
  }
  return TebakKataSchema.parse(
    tebakkatajson[Math.floor(Math.random() * tebakkatajson.length)]
  )
}
