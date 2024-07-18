import got from 'got'
import cheerio from 'cheerio'
import { FacebookDlArgsSchema, FacebookDlMediaSchema, FacebookDlSchema } from '../types/facebook-v1.js'
import { DEFAULT_HEADERS } from './constant.js'

export default async function facebookdl(url: string) {
    FacebookDlArgsSchema.parse(arguments)
    const html = await got('https://fdownloader.net/en', {
        headers: {
            ...DEFAULT_HEADERS
        }
    }).text()
    const k_url_search = /k_url_search="(.*?)"/.exec(html)![1]
    const k_exp = /k_exp="(.*?)"/.exec(html)![1]
    const k_token = /k_token="(.*?)"/.exec(html)![1]
    const k_prefix_name = /k_prefix_name="(.*?)"/.exec(html)![1]

    const form = {
        k_exp,
        k_token,
        q: url,
        lang: 'en',
        web: 'fdownloader.net',
        v: 'v2',
        w: ''
    }
    const data = await got.post(k_url_search, {
        headers: {
            ...DEFAULT_HEADERS,
            referer: 'https://fdownloader.net/'
        },
        form
    }).json<{ data: string }>()

    const $ = cheerio.load(data.data)

    const k_url_convert = /k_url_convert = "(.*?)"/.exec($.html())![1]
    const c_exp = /k_exp = "(.*?)"/.exec($.html())![1]
    const c_token = /c_token = "(.*?)"/.exec($.html())![1]

    const thumbnail = $('.thumbnail > .image-fb > img').attr('src')
    const duration = $('.content > .clearfix > p').text() || undefined
    const video = $('table.table').eq(0).find('tbody > tr').map((_, el) => {
        const $el = $(el)
        const $td = $el.find('td')
        const quality = $td.eq(0).text()
        const url = $td.eq(2).find('a').attr('href')
        if (url) {
            return {
                quality,
                download: () => Promise.resolve(url)
            }
        }
        // TODO:
        return false
        const $button = $td.eq(2).find('button')
        const ftype = 'mp4'
        const v_id = $('#FbId').attr('value')
        const videoUrl = $button.attr('data-videourl')
        const videoType = $button.attr('data-videotype')
        const videoCodec = $button.attr('data-videocodec')
        const fquality = $button.attr('data-fquality')
        const audioUrl = $('#audioUrl').attr('value')
        const audioType = $('#audioType').attr('value')
    }).toArray().filter(Boolean)

    const audio: FacebookDlMediaSchema = []
    const audioUrl = $('#audioUrl').attr('value')!
    audio.push({
        quality: '7kbps',
        download: () => Promise.resolve(audioUrl)
    })

    const result = {
        thumbnail,
        duration,
        video,
        audio
    }
    console.log(result)
    return FacebookDlSchema.parse(result)
}

export async function convert(
    url: string,
    v_id: string,
    ftype: string,
    videoUrl: string,
    videoType: string,
    videoCodec: string,
    audioUrl: string,
    audioType: string,
    fquality: string,
    fname: string,
    exp: string,
    token: string,
) {
    const data = await got.post(url, {
        form: {
            ftype,
            v_id,
            videoUrl,
            videoType,
            videoCodec,
            audioUrl,
            audioType,
            fquality,
            fname,
            exp,
            token,
            cv: 'v2'
        }
    })
}