import fetch from 'node-fetch'

interface tebakgambarresult {
    index: number,
    img: string,
    jawaban: string,
    deskripsi: string,
}

export let tebakgambarjson: tebakgambarresult[]
export default async function tebakgambar(): Promise<tebakgambarresult> {
    if (!tebakgambarjson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
        tebakgambarjson = await res.json()
    }
    return tebakgambarjson[Math.floor(Math.random() * tebakgambarjson.length)] as tebakgambarresult
}