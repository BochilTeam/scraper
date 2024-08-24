import got from 'got'
import * as cheerio from 'cheerio'
import { KodePosArgsSchema, KodePosSchema } from '../types/kodepos.js'
import { DEFAULT_HEADERS } from './constant.js'

export default async function kodepos(query: string) {
    KodePosArgsSchema.parse(arguments)

    const form = {
        kodepos: query
    }
    const html = await got.post('https://kodepos.posindonesia.co.id/CariKodepos', {
        headers: {
            ...DEFAULT_HEADERS
        },
        form
    }).text()

    const $ = cheerio.load(html)
    const result = $('tbody > tr').map((_, el) => {
        const $td = $(el).find('td')
        const kodepos  = $td.eq(1).text()
        const desa  = $td.eq(2).text()
        const kecamatan  = $td.eq(3).text()
        const kota = $td.eq(4).text()
        const provinsi = $td.eq(5).text()
        return {
            kodepos,
            desa,
            kecamatan,
            kota,
            provinsi
        }
    }).toArray()

    return KodePosSchema.parse(result)
}