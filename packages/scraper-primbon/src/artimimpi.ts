import got from 'got'
import { ArtiMimpiSchema, ArtiMimpi } from '../types/index.js'

export default async function artimimpi (mimpi: string): Promise<ArtiMimpi[]> {
  const data = await got(
		`https://www.primbon.com/tafsir_mimpi.php?mimpi=${mimpi}&submit=+Submit+`
  ).text()
  const results: string[] | void = data
    .split('</i></b><br><br>')[1]
    ?.split('<!-- AWAL IN-ARTICLE ADV -->')[0]
    ?.replace(/<(\/)?font( color=#ff0000)?>/gi, '')
    ?.trim()
    ?.split('<br><br>')
    ?.filter((v: string) => v)
  return (results || []).map((value) => ArtiMimpiSchema.parse(value))
}
