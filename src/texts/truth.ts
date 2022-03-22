import got from 'got'

export let truthjson: string[] = []
export default async function truth (): Promise<string> {
  if (!truthjson.length) {
    truthjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/truth.json'
    ).json()
  }
  return truthjson[Math.floor(truthjson.length * Math.random())]
}
