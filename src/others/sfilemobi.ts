import got from 'got'
import cherio from 'cheerio'
import {
  parseFileSize,
  ScraperError
} from '../utils.js'
import {
  SfileMobi,
  SfileMobiArgsSchema,
  SfileMobiSchema,
  SfileMobiSearch,
  SfileMobiSearchArgsSchema,
  SfileMobiSearchSchema
} from './types.js'

export async function sfilemobiSearch (query: string, page: number = 1): Promise<SfileMobiSearch[]> {
  SfileMobiSearchArgsSchema.parse(arguments)

  const html = await got(`https://sfile.mobi/search.php?q=${query}&page=${page}`).text()
  const $ = cherio.load(html)

  const results: SfileMobiSearch[] = []
  $('div > div > div > div.list').each((_, el) => {
    const $el = $(el)
    const url = $el.find('a').attr('href')
    const filename = $el.find('a').text()
    const icon = $el.find('img').attr('src')
    const type = /\/smallicon\/(.*?)\.svg/.exec(icon!)?.[1]
    const filesizeH = /\((.*?)\)/.exec($el.text())?.[1]
    const filesize = filesizeH && parseFileSize(filesizeH)
    if (filename && url) {
      results.push({
        url,
        filename,
        icon: icon!,
        type: type!,
        filesizeH: filesizeH!,
        filesize: filesize! as number
      })
    }
  })

  if (!results.length) {
    throw new ScraperError(`No results for ${query}`)
  }

  return results.map(res => SfileMobiSearchSchema.parse(res))
}

export async function sfilemobi (url: string): Promise<SfileMobi> {
  SfileMobiArgsSchema.parse(arguments)

  if (!/sfile\.mobi/i.test(url)) throw new ScraperError(`Invalid URL: ${url}`)

  const html = await got(url).text()
  const $ = cherio.load(html)

  const $k = /var z = (.*?);/i.exec($.html())?.[1]
  const urlPage = (
    (/var db = "(.*?)"/i.exec($.html())?.[1] || /var sf = "(.*?)"/i.exec($.html())?.[1])?.replace(/\\(\\)?/gi, '') ||
    $('#download').attr('href')
  ) + `&k=${$k}`
  const urlHtml = await got(urlPage).text()
  const $$ = cherio.load(urlHtml)
  const _url = $$('div.menu > div > p > a').attr('href')
  const filename = $('div.intro-container > img').attr('alt') || $('div.intro-container > h1').text()
  const icon = $('div.intro-container > img').attr('src')
  const type = /\/smallicon\/(.*?)\.svg/.exec(icon!)?.[1]
  const $list = $('div.list')
  const mimetype = $list.eq(0).text().split('-')[1]?.trim()
  const aploud = $list.eq(2).text().split('Uploaded:')[1]?.trim()
  const $aploud = $list.eq(1).find('a')
  const aploudby = $aploud.eq(0).text()
  const aploudbyUrl = $aploud.eq(0).attr('href')
  const aploudon = $aploud.eq(1).text()
  const aploudonUrl = $aploud.eq(1).attr('href')
  const downloads = parseInt($list.eq(3).text().split('Downloads:')[1]?.trim())
  const filesizeH = /\((.*?)\)/i.exec($$('div.menu > div > h1 > b').text())?.[1]
  const filesize = filesizeH && parseFileSize(filesizeH)

  const results = {
    url: _url!,
    filename,
    icon,
    type,
    mimetype,
    aploud,
    aploudby,
    aploudbyUrl,
    aploudon,
    aploudonUrl,
    downloads,
    filesizeH,
    filesize: filesize! as number
  }
  return SfileMobiSchema.parse(results)
}
