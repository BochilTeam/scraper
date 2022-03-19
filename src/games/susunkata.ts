import got from 'got'
import { SusunKata } from './types'

export let susunkatajson: SusunKata[]
export default async function susunkata (): Promise<SusunKata> {
  if (!susunkatajson) {
    susunkatajson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json'
    ).json()
  }
  return susunkatajson[
    Math.floor(Math.random() * susunkatajson.length)
  ] as SusunKata
}
