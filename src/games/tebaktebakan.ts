import fetch from 'node-fetch'

interface tebaktebakanresult {
    soal: string,
    jawaban: string
}

export let tebaktebakanjson: tebaktebakanresult[]
export default async function tebaktebakan(): Promise<tebaktebakanresult> {
    if (!tebaktebakanjson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json')
        tebaktebakanjson = await res.json()
    }
    return tebaktebakanjson[Math.floor(Math.random() * tebaktebakanjson.length)] as tebaktebakanresult
}