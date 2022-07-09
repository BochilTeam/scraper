import got from 'got'
import { AlQuran, AlQuranSchema } from './types.js'

export async function alquran (): Promise<AlQuran[]> {
  const data: AlQuran[] = await got(
    'https://raw.githubusercontent.com/rzkytmgr/quran-api/master/data/quran.json'
  ).json()
  return data.map(item => AlQuranSchema.parse(item))
}
