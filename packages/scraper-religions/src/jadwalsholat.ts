import * as cheerio from 'cheerio'
import got from 'got'
import { didyoumean } from '../utils/index.js'
import {
  JadwalSholat,
  JadwalSholatArgsSchema,
  JadwalSholatItem,
  JadwalSholatItemSchema,
  JadwalSholatSchema
} from '../types/index.js'

export const listJadwalSholat = (async () => got('https://github.com/BochilTeam/scraper/raw/master/data/jadwal-sholat.json').json<JadwalSholatItem[]>())()

/**
 * Scrape from https://www.jadwalsholat.org/
 */
export default async function jadwalsholat(
  kota: string
): Promise<JadwalSholat> {
  JadwalSholatArgsSchema.parse(arguments)

  const listJadwal: JadwalSholatItem[] = await listJadwalSholat
  const cities = listJadwal.map(item => item.kota)
  const prediction = didyoumean(kota, cities)
  const precisionPredection = didyoumean(kota, cities, { threshold: 0.85 })[0]
  if (!precisionPredection) {
    throw new Error(
      `Did you mean ${prediction.map(item => item.query).join(', ')}?\n\nList of cities: ${cities.map((city) => `- ${city}`).join('\n')}`
    )
  }
  const jadwal = listJadwal[precisionPredection.index]
  JadwalSholatItemSchema.parse(jadwal)

  const data = await got(
    `https://jadwalsholat.org/jadwal-sholat/monthly.php?id=${jadwal.value}`
  ).text()
  const $ = cheerio.load(data)
  const date = $('tr.table_title > td > h2.h2_edit').text().trim()
  const location = $('tr.table_block_content > td[colspan=7]').html()!.split('</b>')[1].trim()
  const direction = $('tr.table_block_content > td[colspan=5]').eq(0).text()!.split('ke')[0].trim()
  const distance = $('tr.table_block_content > td[colspan=5]').eq(1).text()!.split('ke')[0].trim()
  const schedules = $('tbody > tr[align=center]')
    .filter('.table_highlight, .table_light, .table_dark')
    .map(function () {
      const el = $(this).find('td')
      const date = el.eq(0).text().trim()
      const imsyak = el.eq(1).text().trim()
      const shubuh = el.eq(2).text().trim()
      const terbit = el.eq(3).text().trim()
      const dhuha = el.eq(4).text().trim()
      const dzuhur = el.eq(5).text().trim()
      const ashr = el.eq(6).text().trim()
      const maghrib = el.eq(7).text().trim()
      const isya = el.eq(8).text().trim()
      return {
        date,
        imsyak,
        shubuh,
        terbit,
        dhuha,
        dzuhur,
        ashr,
        maghrib,
        isya
      }
    }).toArray()

  const result = {
    date,
    location,
    direction,
    distance,
    schedules
  }
  return JadwalSholatSchema.parse(result)
}
