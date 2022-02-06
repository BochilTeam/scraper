import got from 'got'
import cheerio from 'cheerio'
import type { Kompas } from './types'

export default async function kompas(): Promise<Kompas[]> {
    const html = await got('https://www.kompas.com/').text()
    const $ = cheerio.load(html)
    const result: Kompas[] = []
    $('div.latest.ga--latest').each((_, el) => {
        $(el).find('div.article__list').each((_, el) => {
            const $el = $(el)
            const title = $el.find('h3 > a.article__link').text()
            const link = $el.find('h3 > a.article__link').attr('href')
            const $image = $el.find('.article__asset > a > img')
            const image = $image.attr('src') || $image.attr('data-src') || null
            const label = $el.find('.article__list__info > .article__subtitle').text()
            const date = $el.find('.article__list__info > .article__date').text()
            if (title) result.push({
                title,
                link,
                image,
                label,
                date,
            })
        })
    })
    return result
}