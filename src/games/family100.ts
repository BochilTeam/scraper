import fetch from 'node-fetch'

interface family100result {
    soal: string,
    jawaban: string[],
}

export let family100json: family100result[]
export default async function family100(): Promise<family100result> {
    if (!family100json) {
        let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')
        family100json = await res.json()
    }
    return family100json[Math.floor(Math.random() * family100json.length)] as family100result
}