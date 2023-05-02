import got from 'got'
import { TebakBendera, TebakBenderaSchema } from '../types/index.js'

export let tebakbenderajson: TebakBendera[]
export default async function tebakbendera (): Promise<TebakBendera> {
  if (!tebakbenderajson) {
    tebakbenderajson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera.json'
    ).json()
  }
  return TebakBenderaSchema.parse(
    tebakbenderajson[Math.floor(Math.random() * tebakbenderajson.length)]
  )
}
