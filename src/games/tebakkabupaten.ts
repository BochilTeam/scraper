import fetch from 'node-fetch'

interface tebakkabupatenresult {
    index: number,
    title: string,
    url: string,
}

export let tebakkabupatenjson: tebakkabupatenresult[]
export default async function tebakkabupaten(): Promise<tebakkabupatenresult> {
    if (!tebakkabupatenjson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkabupaten.json')
        tebakkabupatenjson= await res.json()
    }
    return tebakkabupatenjson[Math.floor(Math.random() * tebakkabupatenjson.length)] as tebakkabupatenresult
}