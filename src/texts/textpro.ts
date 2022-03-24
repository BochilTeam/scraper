import got from 'got'
import { load } from 'cheerio'
import FormData from 'form-data'
import type { TextProList } from './types'
import { ScraperError } from '../utils.js'

const BASE_URL = 'https://textpro.me'

export const textproList: Promise<TextProList[]> = (async () => got('https://raw.githubusercontent.com/BochilTeam/scraper/master/data/textpro.json').json<TextProList[]>())()
export default async function textpro (effect: string, params: string[] | string) {
  const list: TextProList[] = await textproList
  const textpro: TextProList | undefined = list.find(
    ({ title }) => title.toLowerCase() === effect.toLowerCase()
  )
  if (!textpro) throw new Error(`TextPro "${effect}" not found`)
  if (!Array.isArray(params)) params = [params]
  const { link, parameters } = textpro
  if (parameters.length > params.length) throw new Error(`TextPro "${effect}" requires ${parameters.length} parameters, but ${params.length} given`)
  const resToken = await got(`${BASE_URL}${link}`)
  const cookie = resToken.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ').trim()
  const $ = load(resToken.body)
  const token = $('#token').val() as string
  const build_server = $('#build_server').val() as string
  const build_server_id = $('#build_server_id').val() as string
  const id = /-(.*?)\.html/.exec(link)?.[1]
  if (!id) throw new ScraperError(`TextPro "${effect}" has no ID`)
  const form = new FormData()
  form.append('id', parseInt(id))
  for (const param of params) form.append('text[]', param)
  form.append('token', token)
  form.append('build_server', build_server)
  form.append('build_server_id', parseInt(build_server_id))
  const json = await got.post(`${BASE_URL}/effect/create-image`, {
    method: 'POST',
    headers: {
      ...form.getHeaders(),
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      cookie: cookie || '__gads=ID=63da40a14f3eb127-22dccf741fd10073:T=1648080134:RT=1648080134:S=ALNI_MZfEIreNTkduqqV5CgZnuei_X1xLQ; _ga=GA1.2.342524260.1648080135; _gid=GA1.2.2036288127.1648080139; PHPSESSID=7fmr2ig9k8r7n9g9uk7fcj2ru1; _gat_gtag_UA_114571019_5=1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36'
    },
    body: form
  }).json()
  return json
}
