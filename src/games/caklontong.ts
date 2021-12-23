import fetch from 'node-fetch'

interface caklontongresult {
    index: number,
    soal: string,
    jawaban: string,
    deskripsi: string,
}

export let caklontongjson: caklontongresult[]
export default async function caklontong(): Promise<caklontongresult> {
    if (!caklontongjson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')
        caklontongjson = await res.json()
    }
    return caklontongjson[Math.floor(Math.random() * caklontongjson.length)] as caklontongresult
}