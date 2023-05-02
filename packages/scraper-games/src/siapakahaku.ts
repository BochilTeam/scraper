import got from 'got'
import { SiapakahAku, SiapakahAkuSchema } from '../types/index.js'

export let siapakahakujson: SiapakahAku[]
export default async function siapakahaku (): Promise<SiapakahAku> {
  if (!siapakahakujson) {
    siapakahakujson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json'
    ).json()
  }
  return SiapakahAkuSchema.parse(
    siapakahakujson[Math.floor(Math.random() * siapakahakujson.length)]
  )
}
