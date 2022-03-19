import got from 'got'
import { TebakKabupaten } from './types'

export let tebakkabupatenjson: TebakKabupaten[]
export default async function tebakkabupaten (): Promise<TebakKabupaten> {
  if (!tebakkabupatenjson) {
    tebakkabupatenjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkabupaten.json'
    ).json()
  }
  return tebakkabupatenjson[
    Math.floor(Math.random() * tebakkabupatenjson.length)
  ] as TebakKabupaten
}
