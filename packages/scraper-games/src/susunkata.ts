import got from 'got'
import { SusunKata, SusunKataSchema } from '../types/index.js'

export let susunkatajson: SusunKata[]
export default async function susunkata (): Promise<SusunKata> {
  if (!susunkatajson) {
    susunkatajson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json'
    ).json()
  }
  return SusunKataSchema.parse(
    susunkatajson[Math.floor(Math.random() * susunkatajson.length)]
  )
}
