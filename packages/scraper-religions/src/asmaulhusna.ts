import got from 'got'
import { AsmaulHusna, AsmaulHusnaArgsSchema, AsmaulHusnaSchema } from '../types/index.js'

export let asmaulhusnajson: AsmaulHusna[]
/**
 * index is the index of the asmaul husna in the list, starting from 1.
 * if the index is not found, it will throw error.
 * if the index is not provided, it will return random index asmaul husna.
 */
export default async function asmaulhusna (index?: number): Promise<AsmaulHusna> {
  AsmaulHusnaArgsSchema.parse(arguments)

  if (!asmaulhusnajson) {
    asmaulhusnajson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/religi/asmaulhusna.json'
    ).json()
  }
  if (!index) index = Math.floor(Math.random() * asmaulhusnajson.length)
  const asmaulhusna = asmaulhusnajson[index]
  if (!asmaulhusna) {
    throw new Error(`Asmaul Husna with index ${index} not found`)
  }
  return AsmaulHusnaSchema.parse(asmaulhusna)
}
