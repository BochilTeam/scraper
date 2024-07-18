import { describe, it } from 'node:test'
import assert from 'node:assert'
import got from 'got'
import { tiktokdl } from '../index.js'
import { TiktokDl } from '../types/tiktok-v1.js'

const TIKTOK_URL = 'https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226'

describe('Tiktok Downloader', async () => {

    let result: TiktokDl
    it('Getting Metadata', async () => {
        result = await tiktokdl(TIKTOK_URL)
        assert.strictEqual(result.nickname, 'OMAGAD😱')
        assert.strictEqual(result.username, '@omagadsus')
    })

    it ('Video Watermark Downloader', async () => {
        const buffer = await got(result.video.withWatermark).buffer()
        assert.ok(buffer.byteLength > 0)
    })

    it ('Video No Watermark Downloader', async () => {
        const buffer = await got(result.video.noWatermark).buffer()
        assert.ok(buffer.byteLength > 0)
    })

    it ('Audio Downloader', async () => {
        const buffer = await got(result.audio).buffer()
        assert.ok(buffer.byteLength > 0)
    })
})