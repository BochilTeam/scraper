import { instagramdl } from '../index.js'
import { test } from 'node:test'
import assert from 'node:assert'
import { Instagramdl } from '../types/instagramdl-v1.js'
import got from 'got'

const IG_REEL_URL = 'https://www.instagram.com/reel/CxSEjxfyJtN'
const IG_P_URL = 'https://www.instagram.com/p/CaHpoweBjmx'

test('Instagram Downloader', async (t) => {
    let reels: Instagramdl
    await t.test('Getting Metadata Reel', async () => {
        reels = await instagramdl(IG_REEL_URL)
        assert.strictEqual(reels.length > 0, true)
    })

    await t.test('Download Reel Video', async () => {
        if (!reels.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ url }] = reels
        const buffer = await got(url).buffer()
        assert.strictEqual(buffer.byteLength > 0, true)
    })

    await t.test('Download Reel Thumbnail', async () => {
        if (!reels.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ thumbnail }] = reels
        const buffer = await got(thumbnail).buffer()
        assert.strictEqual(buffer.byteLength > 0, true)
    })

    let photos: Instagramdl
    await t.test('Getting Metadata Photos', async () => {
        photos = await instagramdl(IG_P_URL)
        assert.strictEqual(photos.length > 5, true)
    })

    await t.test('Download Photo', async () => {
        if (!photos.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ url }] = photos
        const buffer = await got(url).buffer()
        assert.strictEqual(buffer.byteLength > 0, true)
    })

    await t.test('Download Photo Thumbnail', async () => {
        if (!photos.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ thumbnail }] = photos
        const buffer = await got(thumbnail).buffer()
        assert.strictEqual(buffer.byteLength > 0, true)
    })

})