import fetch from 'node-fetch'

interface tebakkataresults {
    index: number,
    soal: string,
    jawaban: string
}

export let tebakkatajson: tebakkataresults[]
export default async function tebakkata(): Promise<tebakkataresults> {
    if (!tebakkatajson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
        tebakkatajson = await res.json()
    }
    return tebakkatajson[Math.floor(Math.random() * tebakkatajson.length)] as tebakkataresults
}