import cheerio from 'cheerio'
import got from 'got'
import { WallpaperSchema } from '../types/index.js'
import { DEFAULT_HEADERS } from './constant.js'

export async function wallpaper(query: string): Promise<string[]> {
    const data = await got(`https://www.shutterstock.com/search/${query}`, {
        headers: DEFAULT_HEADERS
    }).text()
    const $ = cheerio.load(data)
    const results: string[] = [
        ...new Set(
            [
                ...$.html().matchAll(
                    /https?:\/\/(image|www)\.shutterstock\.com\/([^"]+)/gim
                )
            ]
                .map((v) => v[0])
                .filter((v) => /.*\.jpe?g|png$/gi.test(v))
        )
    ]
    return results.map((value) => WallpaperSchema.parse(value))
}