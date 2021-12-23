import fetch from 'node-fetch'

interface tebaklirikresult {
    soal: string,
    jawaban: string
}

export let tebaklirikjson: tebaklirikresult[]
export default async function tebaklirik(): Promise<tebaklirikresult> {
    if (!tebaklirikjson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')
        tebaklirikjson = await res.json()
    }
    return tebaklirikjson[Math.floor(Math.random() * tebaklirikjson.length)] as tebaklirikresult
}