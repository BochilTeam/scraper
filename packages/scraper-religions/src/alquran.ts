import got from 'got'
import { AlQuran, AlQuranSchema } from '../types/index.js'

export async function alquran (): Promise<AlQuran[]> {
  const data: AlQuran[] = await got(
    'https://raw.githubusercontent.com/rzkytmgr/quran-api/deprecated/data/quran.json'
  ).json()
  return data.map(item => AlQuranSchema.parse(item))
}
