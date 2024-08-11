import got from 'got'
import * as cheerio from 'cheerio'
import FormData from 'form-data'
import { TwitterDlArgsSchema, TwitterDLResponseSchema, TwitterDlSchema } from '../types/twitter-v1.js'
import { DEFAULT_HEADERS } from './constant.js'
import { stringifyCookies, generateTokenId } from './util.js'

export default async function twitterdl(url: string) {
    TwitterDlArgsSchema.parse(arguments)

    const id = (url.match(/status\/(\d+)/) || url.match(/(\d+)/))![1]
    // a.prototype.loadTweet
    const token = generateTokenId(id)

    const data = await got(`https://api.redketchup.io/tweetAttachments-v6?id=${encodeURIComponent(token)}`, {
        headers: {
            ...DEFAULT_HEADERS,
            origin: 'https://redketchup.io',
            referer: 'https://redketchup.io/',
        }
    }).json()
    const json = TwitterDLResponseSchema.parse(data)
    const media = json.includes.media.find((media) => media.type === 'video')!
    const result = media.variants.filter((variant) => variant.content_type !== 'application/x-mpegURL')

    return TwitterDlSchema.parse(result)
}