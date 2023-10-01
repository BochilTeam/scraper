import got from 'got'
import cheerio from 'cheerio'
import { DEFAULT_HEADERS } from './constant.js'
import {
    Instagramdl,
    InstagramdlArgsSchema,
    InstagramdlSchema
} from '../types/instagramdl-v1.js'

export default async function instagramdl (url: string) {
    InstagramdlArgsSchema.parse(arguments)

    const form = {
        url,
        host: 'instagram'
    }
    const data = await got.post('https://www.w3toys.com/core/ajax.php', {
        headers: {
            ...DEFAULT_HEADERS,
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://www.w3toys.com'
        },
        form
    }).text()
    const $ = cheerio.load(data)
    const results: Instagramdl = []
    $('.row > div').find('div.row').each(function () {
        const $el = $(this)
        const thumbnail = $el.find('img').attr('src')!
        const url = 'https://www.w3toys.com/' + $el.find('a').attr('href')
        results.push({
            thumbnail,
            url,
            // TODO: Add type 'image' or 'video'
        })
    })
    return InstagramdlSchema.parse(results)
}