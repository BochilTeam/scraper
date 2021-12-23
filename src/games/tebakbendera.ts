import fetch from 'node-fetch'

interface tebakbenderaresult {
    flag: string,
    img: string,
    name: string
}

export let tebakbenderajson: tebakbenderaresult[]
export default async function tebakbendera(): Promise<tebakbenderaresult> {
    if (!tebakbenderajson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera.json')
        tebakbenderajson = await res.json()
    }
    return tebakbenderajson[Math.floor(Math.random() * tebakbenderajson.length)] as tebakbenderaresult
}