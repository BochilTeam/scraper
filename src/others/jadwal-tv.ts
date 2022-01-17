import got from "got";
import cheerio from "cheerio";
import { join } from "path";
import { readFileSync } from "fs";
import { JadwalTV, JadwalTVNOW } from "./types"
import { ScraperError } from "../utils"

type ListJadwalTV = {
    value: string;
    channel: string;
    isPay: boolean;
}[]
export const listJadwalTV: ListJadwalTV = JSON.parse(
    readFileSync(
        join(__dirname, '../../data/jadwal-tv.json'),
        'utf8'
    )
)
export default async function jadwalTV(channel: string): Promise<JadwalTV> {
    const data = listJadwalTV.find(
        ({ channel: name }) => (new RegExp(channel, 'ig')).test(name)
    )
    if (!data) throw new ScraperError(`List not found!!\n${JSON.stringify(listJadwalTV, null, 2)}`)
    const text = await got(
        `https://www.jadwaltv.net/${data.isPay ? 'jadwal-pay-tv/' : ''}${data.value}`
    ).text()
    const result: JadwalTV['result'] = []
    const $ = cheerio.load(text)
    $("div > table.table").each(function () {
        $(this).find("tbody > tr")
            .slice(1).each(function () {
                const el = $(this).find("td")
                const date = el.eq(0).text()
                const event = el.eq(1).text();
                if (!/Jadwal TV selengkapnya di/ig.test(event)) result.push({
                    date, event
                })
            })
    })
    return {
        channel: data.channel,
        result
    }
}

export async function jadwalTVNow(): Promise<JadwalTVNOW> {
    const text = await got("https://www.jadwaltv.net/channel/acara-tv-nasional-saat-ini").text()
    const result: JadwalTVNOW = {}
    const $ = cheerio.load(text)
    $("div > table.table").each(function () {
        let prevChannel: string
        $(this).find("tbody > tr")
            .slice(1).each(function () {
                const el = $(this).find("td")
                const channel = el.eq(0).find("strong > a[href]")
                    .text().trim().toLowerCase()
                if (channel) {
                    prevChannel = channel
                    result[channel] = []
                } else if (prevChannel) {
                    const date = el.eq(0).text()
                    const event = el.eq(1).text()
                    result[prevChannel].push({
                        date,
                        event
                    })
                }
            })
    })
    return result
}