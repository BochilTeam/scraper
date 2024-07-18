import cheerio from 'cheerio'
import got from 'got'
import { GoogleImage, GoogleImageSchema } from '../types/index.js'
import { DEFAULT_HEADERS } from './constant.js'

export default async function googleImage (query: string): Promise<GoogleImage[]> {
    const data = await got(`https://www.google.com/search?q=${query}&tbm=isch`, {
        headers: DEFAULT_HEADERS
    }).text()

    const $ = cheerio.load(data)
    const pattern =
        /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm
    const matches = $.html().matchAll(pattern)
    const decodeUrl = (url: string) => decodeURIComponent(JSON.parse(`"${url}"`))
    return [...matches]
        .map(({ groups }) => decodeUrl(groups?.url as string))
        .filter((v) => /.*\.jpe?g|png$/gi.test(v))
        .map((value) => GoogleImageSchema.parse(value))
}
