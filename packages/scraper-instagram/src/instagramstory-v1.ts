import got from 'got'
import * as cheerio from 'cheerio'
import { DEFAULT_HEADERS } from './constant.js'
import {
    InstagramStory,
    InstagramStoryArgsSchema,
    InstagramStoryItem,
    InstagramStorySchema
} from '../types/instagramstory-v1.js'
import crypto from 'crypto'

export default async function instagramStory(username: string) {
    InstagramStoryArgsSchema.parse(arguments)

    const form = {
        'g-recaptcha-response': crypto.randomBytes(16).toString('hex'), // captcha is not checked on the backend 
        text_username: username,
        user_data: ''
    }
    const data = await got.post('https://www.storysaver.net/storyProcesst.php?c=1', {
        headers: {
            ...DEFAULT_HEADERS,
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://www.storysaver.net',
            referer: 'https://www.storysaver.net/'
        },
        form
    }).text()
    const $ = cheerio.load(data)
    const results: InstagramStory = []
    $('.stylestory').each(function () {
        const $el = $(this)
        const thumbnail = ($el.find('video').attr('poster') || $el.find('img').attr('src'))!
        const $a = $el.find('a')
        const url = $a.attr('href')!
        const type = /video/i.test($a.text()) ? 'video' : 'image'
        results.push({
            thumbnail,
            url,
            type
        })
    })
    return InstagramStorySchema.parse(results)
}