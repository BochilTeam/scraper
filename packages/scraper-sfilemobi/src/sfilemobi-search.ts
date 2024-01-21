import got from 'got'
import cheerio from 'cheerio'
import { parseFileSize } from './util.js'
import { DEFAULT_HEADERS } from './constant.js'
import { SfilemobiSearch, SfilemobiSearchArgsSchema, SfilemobiSearchSchema } from '../types/sfilemobi-search.js'

export default async function sfilemobiSearch(query: string, page: number = 1) {
    SfilemobiSearchArgsSchema.parse(arguments)

    const data = await got('https://sfile.mobi/search.php', {
        searchParams: {
            q: query,
            page
        },
        headers: {
            ...DEFAULT_HEADERS
        }
    }).text()
    const $ = cheerio.load(data)

    const results: SfilemobiSearch = []
    $('div > div > div.list').each((_, el) => {
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

    return SfilemobiSearchSchema.parse(results)
}