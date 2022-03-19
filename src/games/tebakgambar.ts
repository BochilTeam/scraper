import got from 'got'
import { TebakGambar } from './types'

export let tebakgambarjson: TebakGambar[]
export default async function tebakgambar (): Promise<TebakGambar> {
  if (!tebakgambarjson) {
    tebakgambarjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json'
    ).json()
  }
  return tebakgambarjson[
    Math.floor(Math.random() * tebakgambarjson.length)
  ] as TebakGambar
}
