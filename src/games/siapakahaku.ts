import got from 'got'
import { SiapakahAku } from './types'

export let siapakahakujson: SiapakahAku[]
export default async function siapakahaku (): Promise<SiapakahAku> {
  if (!siapakahakujson) {
    siapakahakujson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json'
    ).json()
  }
  return siapakahakujson[
    Math.floor(Math.random() * siapakahakujson.length)
  ] as SiapakahAku
}
