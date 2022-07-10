import got from 'got'
import cheerio from 'cheerio'
import {
  ZippyShare,
  ZippyShareArgsSchema,
  ZippyShareSchema
} from './types.js'
import { parseFileSize, ScraperError } from '../utils.js'

export default async function zippyshare (url: string): Promise<ZippyShare> {
  ZippyShareArgsSchema.parse(arguments)

  if (!/zippyshare\.com/.test(url)) throw new Error('Invalid URL: ' + url)

  const res = await got(url)
  // eslint-disable-next-line no-unused-vars
  const [_, __, host, ___, id] = res.url.split('/')
  const $ = cheerio.load(res.body)
  const $lrbox = $('#lrbox > div.left')
  const filename = $lrbox.find('font').eq(2).text().trim()
  const $div = $lrbox.find('div').eq(0).find('div').eq(0)
  const filesizeH = $div.find('font').eq(1).text().trim()
  const filesize = parseFileSize(filesizeH)
  const aploud = $div.find('font').eq(3).text().trim()
  const lastDownload = $div.find('font').eq(5).text().trim()
  const urlId = /\((.*?)\)/i.exec($.html().split('document.getElementById(\'dlbutton\').href =')[1]?.split(';')[0])?.[0]?.trim()
  if (!urlId) {
    throw new ScraperError(`Can't get urlId for download url from ${url}`)
  }
  // eslint-disable-next-line no-eval
  const urlIdRes = eval(urlId)
  const _url = `https://${host}/d/${id}/${urlIdRes}/${filename}`
  // const url2 = `https://${host}/i/${id}/${urlIdRes}/${filename}`

  const result = {
    url: _url,
    // url2,
    filename,
    filesizeH,
    filesize,
    aploud,
    lastDownload
  }
  return ZippyShareSchema.parse(result)
}
