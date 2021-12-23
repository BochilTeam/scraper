import fetch from 'node-fetch'

interface susunkataresult {
    index: number,
    soal: string,
    tipe: string,
    jawaban: string,
}

export let susunkatajson: susunkataresult[]
export default async function susunkata(): Promise<susunkataresult> {
    if (!susunkatajson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')
        susunkatajson = await res.json()
    }
    return susunkatajson[Math.floor(Math.random() * susunkatajson.length)] as susunkataresult
}