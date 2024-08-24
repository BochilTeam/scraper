import got from 'got'
import * as cheerio from 'cheerio'
import { DEFAULT_HEADERS } from './constant.js'
import {
    Instagramdl,
    InstagramdlArgsSchema,
    InstagramdlSchema
} from '../types/instagramdl-v1.js'

export default async function instagramdl(url: string) {
    InstagramdlArgsSchema.parse(arguments)

    const form = {
        recaptchaToken: '',
        q: url,
        t: 'media',
        lang: 'id'
    }
    const data = await got.post('https://v3.igdownloader.app/api/ajaxSearch', {
        headers: {
            ...DEFAULT_HEADERS,
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://igdownloader.app',
            'referer': 'https://igdownloader.app/'
        },
        form
    }).json<{ status: string, p: 'instagram', data: string }>()
    if (data.status !== 'ok') {
        throw data
    }
    const $ = cheerio.load(data.data)
    const results: Instagramdl = []
    $('.download-items').each(function () {
        const $el = $(this)
        const $img = $el.find('.download-items__thumb > img')
        const thumbnail = $img.attr('data-src') || $img.attr('src')!
        const $a = $el.find('.download-items__btn > a')
        const url = $a.attr('href')!
        const type = /video/i.test($a.find('span').text()) ? 'video' : 'image'
        results.push({
            thumbnail,
            url,
            type
        })
    })
    return InstagramdlSchema.parse(results)
}