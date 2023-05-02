import got from 'got'
import FormData from 'form-data'
import { load } from 'cheerio'
import { AiovideodlArgsSchema, Aiovideodl, AiovideodlSchema } from '../types/index.js'
import { stringifyCookies } from '../utils/index.js'

export default async function aiovideodl (url: string): Promise<Aiovideodl> {
  AiovideodlArgsSchema.parse(arguments)

  const resToken = await got('https://aiovideodl.ml/')

  const $$ = load(resToken.body)
  const token = $$('#token').val() as string
  const cookie = stringifyCookies(resToken.headers['set-cookie'] || [])

  const form = new FormData()
  form.append('url', url)
  form.append('token', token)

  const json = await got('https://aiovideodl.ml/wp-json/aio-dl/video-data/', {
    method: 'post',
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/x-www-form-urlencoded',
      cookie: cookie || 'PHPSESSID=a80484014887c57527a38e750fdff8cc; pll_language=en; _ga_YPH9WYCMSV=GS1.1.1682995715.1.0.1682995715.0.0.0; _ga=GA1.2.820896926.1682995715; _gid=GA1.2.1679842969.1682995715; _gat_gtag_UA_46116261_21=1',
      origin: 'https://aiovideodl.ml',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
    },
    form
  }).json<Aiovideodl>()

  return AiovideodlSchema.parse(json)
}
