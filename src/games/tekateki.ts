import fetch from 'node-fetch'

interface tekatekiresult {
    soal: string,
    jawaban: string
}

export let tekatekijson: tekatekiresult[]
export default async function tekateki(): Promise<tekatekiresult> {
    if (!tekatekijson) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json')
        tekatekijson = await res.json()
    }
    return tekatekijson[Math.floor(Math.random() * tekatekijson.length)] as tekatekiresult
}