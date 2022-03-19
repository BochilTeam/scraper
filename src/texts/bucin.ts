import got from 'got'
export let bucinjson: string[] = []
export default async function bucin (): Promise<string> {
  if (!bucinjson.length) {
    bucinjson = await got(
      'https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/bucin.json'
    ).json()
  }
  return bucinjson[Math.floor(bucinjson.length * Math.random())]
}
