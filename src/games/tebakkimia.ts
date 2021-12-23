import fetch from 'node-fetch'

interface tebakkimiaresult {
    unsur: string,
    lambang: string,
}

export let tebakkimiajson: tebakkimiaresult[]
export default async function tebakkimia(): Promise<tebakkimiaresult> {
    if (!tebakkimiajson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json')
        tebakkimiajson = await res.json()
    }
    return tebakkimiajson[Math.floor(Math.random() * tebakkimiajson.length)] as tebakkimiaresult
}