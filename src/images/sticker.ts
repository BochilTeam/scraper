import cheerio from 'cheerio'
import got from 'got'
import { ResponseStickerLine, StickerLine, StickerTelegram } from './types'

export async function stickerTelegram (
  query: string,
  page?: number
): Promise<StickerTelegram[]> {
  const data = await got(
    `https://combot.org/telegram/stickers?q=${encodeURI(query)}&page=${page || 1
    }`
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
  return results
}

export async function stickerLine (query: string): Promise<StickerLine[]> {
  const data: { items: ResponseStickerLine[] } = await got(
    `https://store.line.me/api/search/sticker?query=${query}&offset=0&limit=36&type=ALL&includeFacets=true`
  ).json()
  return data.items.map(
    ({
      title,
      productUrl,
      id,
      description,
      payloadForProduct: { staticUrl, animationUrl, soundUrl },
      authorId,
      authorName
    }: ResponseStickerLine) => {
      return {
        id,
        title,
        description,
        url: encodeURI('https://store.line.me' + productUrl),
        sticker: staticUrl,
        stickerAnimated: animationUrl,
        stickerSound: soundUrl,
        authorId,
        authorName
      }
    }
  )
}
