import got from 'got'
import { TebakGambar, TebakGambarSchema } from '../types/index.js'

export let tebakgambarjson: TebakGambar[]
export default async function tebakgambar (): Promise<TebakGambar> {
  if (!tebakgambarjson) {
    tebakgambarjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json'
    ).json()
  }
  return TebakGambarSchema.parse(
    tebakgambarjson[Math.floor(Math.random() * tebakgambarjson.length)]
  )
}
