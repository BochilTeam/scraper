import fetch from 'node-fetch'

interface siapakahakuresult {
    index: number,
    soal: string,
    jawaban: string,
}

export let siapakahakujson: siapakahakuresult[]
export default async function siapakahaku(): Promise<siapakahakuresult> {
    if (!siapakahakujson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json')
        siapakahakujson = await res.json()
    }
    return siapakahakujson[Math.floor(Math.random() * siapakahakujson.length)] as siapakahakuresult
}