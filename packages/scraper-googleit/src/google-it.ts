import got from 'got'
import cheerio from 'cheerio'
import { GoogleItArgsSchema, GoogleItSchema, GoogleIt } from '../types/google-it.js'
import { DEFAULT_HEADERS } from './constant.js'

export default async function googleit(query: string, page: number = 0) {
    GoogleItArgsSchema.parse(arguments)

    const body = await got('https://www.google.com/search', {
        searchParams: {
            q: query,
            start: page * 10
        },
        headers: DEFAULT_HEADERS
    }).text()
    const $ = cheerio.load(body)
    const title = $('div[data-attrid=title][role=heading]').text().trim()
    const type = $('div[data-attrid=subtitle][role=heading]').text().trim()
    const description = $('div.wDYxhc:not(.NFQFxe), div.wDYxhc.NFQFxe .V8fWH').map((_, el) => {
        const $el = $(el)
        $el.find('.SW5pqf').remove() // Lainnya
        $el.find('h3').remove() // Header
        const text = $el.text().trim()
        if (text) return text
    }).toArray().filter(Boolean).join('\n')
    const related = $('.related-question-pair span.CSkcDe').map((_, el) => $(el).text().trim())
        .toArray().filter(Boolean)
    // const images = $('g-inner-card.xIfh4d > div > div > img').map((_, el) => {
    //     const $el = $(el)
    //     return $el.attr('src')
    // }).toArray().filter(Boolean)


    const articles = $('#kp-wp-tab-overview div.TzHB6b').map((_, el) => {
        const $el = $(el)
        const $header = $el.find('div.q0vns')
        const header = $header.find('span.VuuXrf').eq(0).text()
        const iconBase64 = $el.find('img.XNo5Ab').attr('src')
        const thumbnail = $el.find('.uhHOwf > img').attr('src')
        const url = $header.find('cite.qLRx3b').eq(0).text().trim()
        const title = $el.find('h3').eq(0).text().trim()
        const gif = $el.find('div.VYkpsb video').attr('src')
        const description = $el.find('div.VwiC3b').text().trim() || $el.find('div.fzUZNc').text().trim()
        const footer = $el.find('.ChPIuf').text().trim()
        if (!url) return false
        return {
            url,
            header,
            thumbnail,
            iconBase64,
            title,
            gif,
            description,
            footer
        }
    }).toArray().filter(Boolean)

    const result = {
        title, 
        type, 
        description,
        related,
        articles
    }
    console.log(JSON.stringify(result, null, 4))
    return GoogleItSchema.parse(result)
}