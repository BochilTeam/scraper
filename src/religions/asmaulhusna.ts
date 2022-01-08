import fetch from 'node-fetch'

interface Iasmaulhusna {
    index: number,
    latin: string,
    arabic: string,
    translation_id: string,
    translation_en: string
}

export let asmaulhusnajson: Iasmaulhusna[]

export default async function asmaulhusna(): Promise<Iasmaulhusna> {
    if (!asmaulhusnajson) asmaulhusnajson = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/religi/asmaulhusna.json')).json()
    return asmaulhusnajson[Math.floor(Math.random() * asmaulhusnajson.length)] as Iasmaulhusna
}
