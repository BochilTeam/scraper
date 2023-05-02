import got from 'got'
import { TebakTebakan, TebakTebakanSchema } from '../types/index.js'

export let tebaktebakanjson: TebakTebakan[]
export default async function tebaktebakan (): Promise<TebakTebakan> {
  if (!tebaktebakanjson) {
    tebaktebakanjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json'
    ).json()
  }
  return TebakTebakanSchema.parse(
    tebaktebakanjson[Math.floor(Math.random() * tebaktebakanjson.length)]
  )
}
