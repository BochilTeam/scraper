import got from 'got'
import { TebakTebakan } from './types'

export let tebaktebakanjson: TebakTebakan[]
export default async function tebaktebakan (): Promise<TebakTebakan> {
  if (!tebaktebakanjson) {
    tebaktebakanjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json'
    ).json()
  }
  return tebaktebakanjson[
    Math.floor(Math.random() * tebaktebakanjson.length)
  ] as TebakTebakan
}
