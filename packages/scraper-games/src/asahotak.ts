import got from 'got'
import { AsahOtak, AsahOtakSchema } from '../types/index.js'

export let asahotakjson: AsahOtak[]
export default async function asahotak (): Promise<AsahOtak> {
  if (!asahotakjson) {
    asahotakjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json'
    ).json()
  }
  return AsahOtakSchema.parse(
    asahotakjson[Math.floor(Math.random() * asahotakjson.length)]
  )
}
