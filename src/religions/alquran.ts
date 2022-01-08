import fetch from 'node-fetch'

interface IresALquran {
    number: number,
    ayatCount: number,
    sequence: number,
    asma: {
        ar: { short: string, long: string },
        en: { short: string, long: string },
        id: { short: string, long: string },
        translation: { en: string, id: string }
    },
    preBismillah?: boolean,
    type: { ar: string, id: string, en: string },
    tafsir: {
        id: string,
        en?: string
    },
    recitation: {
        full: string
    },
    ayahs: {
        number: { inquran: number, insurah: number },
        juz: number,
        manzil: number,
        page: number,
        ruku: number,
        hizbQuarter: number,
        sajda: { recommended: boolean, obligatory: boolean },
        text: {
            ar: string,
            read: string
        },
        translation: {
            en: string,
            id: string
        },
        tafsir: {
            id: string,
            en?: string
        },
        audio: {
            url: string
        }
    }[]
}
export async function alquran(): Promise<IresALquran[]> {
    const data: IresALquran[] = await (await fetch('https://raw.githubusercontent.com/rzkytmgr/quran-api/master/data/quran.json')).json()
    return data
}