import got from 'got'
import { Bucin, BucinSchema } from '../types/index.js'

export let bucinjson: string[] = []
export default async function bucin (): Promise<Bucin> {
  if (!bucinjson.length) {
    bucinjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/bucin.json'
    ).json()
  }
  return BucinSchema.parse(
    bucinjson[Math.floor(bucinjson.length * Math.random())]
  )
}
