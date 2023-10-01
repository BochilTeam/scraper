import got from 'got'
import cheerio from 'cheerio'
import { DEFAULT_HEADERS } from './constant.js'
import {
    InstagramStory,
    InstagramStoryArgsSchema,
    InstagramStoryItem,
    InstagramStorySchema
} from '../types/instagramstory-v1.js'

export default async function instagramStory (username: string) {
    InstagramStoryArgsSchema.parse(arguments)

    const form = {
        url: `https://www.instagram.com/${username}/`,
        lang_code: 'en',
        token: ''
    }
    const data = await got.post('https://fastdl.app/c/', {
        headers: {
            ...DEFAULT_HEADERS,
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://fastdl.app',
            'referer': 'https://fastdl.app/en/story-saver'
        },
        form
    }).text()
    const $ = cheerio.load(data)
    const results: InstagramStory = []
    $('div.max-w-md').each(function () {
        const $el = $(this)
        const thumbnail = $el.find('img.w-full').attr('src')!
        const $a = $el.find('a')
        const url = $a.attr('href')!
        const type = $a.attr('data-mediatype')!.toLowerCase() as InstagramStoryItem['type']
        results.push({
            thumbnail,
            url,
            type
        })
    })
    return InstagramStorySchema.parse(results)
}