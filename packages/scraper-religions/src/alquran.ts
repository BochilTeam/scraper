import got from 'got'
import { AlQuran, AlQuranSchema } from '../types/index.js'

/**
 * Inspiration from https://github.com/rzkytmgr/quran-api
 */
export async function alquran (): Promise<AlQuran[]> {
  const data: AlQuran[] = await got(
    'https://github.com/rzkytmgr/quran-api/raw/deprecated/data/quran.json'
  ).json()
  return data.map(item => AlQuranSchema.parse(item))
}
