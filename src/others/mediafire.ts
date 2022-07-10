import got from 'got'
import cheerio from 'cheerio'
import { Mediafire, MediafireArgsSchema, MediafireSchema } from './types.js'
import { parseFileSize } from '../utils.js'

export async function mediafiredl (url: string): Promise<Mediafire> {
  MediafireArgsSchema.parse(arguments)

  // if (!/https?:\/\/(www\.)?mediafire\.com/.test(url)) throw new Error('Invalid URL: ' + url)

  const data = await got(url).text()
  const $ = cheerio.load(data)
  const Url = ($('#downloadButton').attr('href') || '').trim()
  const url2 = ($('#download_link > a.retry').attr('href') || '').trim()
  const $intro = $('div.dl-info > div.intro')
  const filename = $intro.find('div.filename').text().trim()
  const filetype = $intro.find('div.filetype > span').eq(0).text().trim()
  const ext = /\(\.(.*?)\)/.exec($intro.find('div.filetype > span').eq(1).text())?.[1]?.trim() || 'bin'
  const $li = $('div.dl-info > ul.details > li')
  const aploud = $li.eq(1).find('span').text().trim()
  const filesizeH = $li.eq(0).find('span').text().trim()
  const filesize = parseFileSize(filesizeH)

  const result = {
    url: Url || url2,
    url2,
    filename,
    filetype,
    ext,
    aploud,
    filesizeH,
    filesize
  }
  return MediafireSchema.parse(result)
}
