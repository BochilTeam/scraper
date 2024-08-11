import * as cheerio from 'cheerio'
import got from 'got'
import { StickerTelegram, StickerTelegramSchema } from '../types/index.js'
import { DEFAULT_HEADERS } from './constant.js'

export default async function stickerTelegram(
  query: string,
  page?: number
): Promise<StickerTelegram[]> {
  const data = await got(
    `https://combot.org/stickers?q=${encodeURI(query)}&page=${page || 1}`,
    {
      headers: {
        ...DEFAULT_HEADERS,
        'user-agent': 'PostmanRuntime/7.39.1' // prevent forbidden
      }
    }
  ).text()
  const $ = cheerio.load(data)
  const results: StickerTelegram[] = []
  $(
    'body > div > main > div.page > div > div.stickers-catalogue > div.tab-content > div > div'
  ).each(function () {
    const title = $(this).find('.sticker-pack__title').text()?.trim()
    const icon = $(this)
      .find(
        '.sticker-pack__sticker > div.sticker-pack__sticker-inner > div.sticker-pack__sticker-img'
      )
      .attr('data-src') as string
    const link = $(this)
      .find('.sticker-pack__header > a.sticker-pack__btn')
      .attr('href') as string
    const stickers: string[] = []
    $(this)
      .find('.sticker-pack__list > div.sticker-pack__sticker')
      .each(function () {
        const sticker = $(this)
          .find('.sticker-pack__sticker-inner > div.sticker-pack__sticker-img')
          .attr('data-src')
        if (sticker) stickers.push(sticker)
      })
    results.push({
      title,
      icon,
      link,
      stickers
    })
  })
  return results.map((value) => StickerTelegramSchema.parse(value))
}

