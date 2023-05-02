import got from 'got'
import { CakLontong, CakLontongSchema } from '../types/index.js'

export let caklontongjson: CakLontong[]
export default async function caklontong (): Promise<CakLontong> {
  if (!caklontongjson) {
    caklontongjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json'
    ).json()
  }
  return CakLontongSchema.parse(
    caklontongjson[Math.floor(Math.random() * caklontongjson.length)]
  )
}
