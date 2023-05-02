import got from 'got'
import cheerio from 'cheerio'
import { AntaraNewsSchema, AntaraNews } from '../types/index.js'

export default async function antaranews (): Promise<AntaraNews[]> {
  const html = await got('https://www.antaranews.com/').text()
  const $ = cheerio.load(html)
  const results: AntaraNews[] = []
  $('div.terkini > article.simple-post').each((_, el) => {
    const $el = $(el)
    const title = $el.find('.latest-news > a').text()
    const link = $el.find('.latest-news > a').attr('href') as string
    const $image = $el.find('picture')
    const image = $image.find('img').attr('src') ||
      $image.find('img').attr('data-src') ||
      $image.find('source').attr('srcset') ||
      $image.find('source').attr('data-srcset')
    const label = $el.find('.simple-share').text()
    const date = $el.find('.simple-share > span').text()
    if (title && image) {
      results.push({
        title,
        link,
        image,
        label: label.replace(date, '').replace('/', '').trim(),
        date: date.trim()
      })
    }
  })
  return results.map((value) => AntaraNewsSchema.parse(value))
}
