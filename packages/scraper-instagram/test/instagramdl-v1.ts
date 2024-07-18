import { describe, it } from 'node:test'
import assert from 'node:assert'
import { instagramdl } from '../index.js'
import { Instagramdl } from '../types/instagramdl-v1.js'
import got from 'got'

const IG_REEL_URL = 'https://www.instagram.com/reel/CxSEjxfyJtN'
const IG_P_URL = 'https://www.instagram.com/p/CaHpoweBjmx'

describe('Instagram Downloader', async (t) => {
    let reels: Instagramdl
    it('Getting Metadata Reel', async () => {
        reels = await instagramdl(IG_REEL_URL)
        assert.ok(reels.length > 0)
    })

    it('Download Reel Video', async (t) => {
        if (!reels?.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ url }] = reels
        const buffer = await got(url).buffer()
        assert.ok(buffer.byteLength > 0)
    })

    it('Download Reel Thumbnail', async (t) => {
        if (!reels?.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ thumbnail }] = reels
        const buffer = await got(thumbnail).buffer()
        assert.ok(buffer.byteLength > 0)
    })

    let photos: Instagramdl
    it('Getting Metadata Photos', async () => {
        photos = await instagramdl(IG_P_URL)
        assert.ok(photos.length > 0)
    })

    it('Download Photo', async (t) => {
        if (!photos?.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ url }] = photos
        const buffer = await got(url).buffer()
        assert.ok(buffer.byteLength > 0)
    })

    it('Download Photo Thumbnail', async (t) => {
        if (!photos?.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ thumbnail }] = photos
        const buffer = await got(thumbnail).buffer()
        assert.ok(buffer.byteLength > 0)
    })

})