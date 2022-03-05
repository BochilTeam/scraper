import got from 'got'
import cheerio from 'cheerio'
import type { CNBCIndonesia } from './types'

export default async function cnbindonesia (): Promise<CNBCIndonesia[]> {
  const html = await got('https://www.cnbcindonesia.com/news').text()
  const $ = cheerio.load(html)
  const results: CNBCIndonesia[] = []
  $('body > div.container > div > ul.list > li').each((_, el) => {
    const $el = $(el)
    const title = $el.find('.box_text > h2').text()
    const subtitle = $el.find('.box_text > .subjudul').text() || undefined
    const link = $el.find('a').attr('href')
    const image = $el.find('span > img').attr('src') as string
    const label = $el.find('.date > .label').text()
    const date = $el.find('.date').text().replace(label, '').replace('-', '').trim()
    if (title && link) {
      results.push({
        title,
        subtitle,
        link,
        image,
        label,
        date
      })
    }
  })
  return results
}
