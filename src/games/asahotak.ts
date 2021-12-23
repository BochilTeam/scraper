import fetch from 'node-fetch'

interface asahotakresult {
    index: number,
    soal: string,
    jawaban: string
}

export let asahotakjson: asahotakresult[]
export default async function asahotak(): Promise<asahotakresult> {
    if (!asahotakjson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json')
        asahotakjson = await res.json()
    }
    return asahotakjson[Math.floor(Math.random() * asahotakjson.length)] as asahotakresult
}