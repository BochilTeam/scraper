import fetch from 'node-fetch'

export let darejson: string[] = []
export default async function dare(): Promise<string> {
    if (!darejson.length) darejson = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/dare.json')).json() as string[]
    return darejson[Math.round(darejson.length * Math.random())]
}