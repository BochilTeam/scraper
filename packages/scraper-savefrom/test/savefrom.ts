import { savefrom } from '../index.js'
import { describe, it } from 'node:test'
import assert from 'node:assert'

const YT_URL = 'https://youtu.be/iik25wqIuFo'
const IG_URL = 'https://www.instagram.com/p/CaHpoweBjmx'
const TIKTOK_URL = 'https://www.tiktok.com/@omagadsus/video/7025456384175017243'
const FB_URL = 'https://fb.watch/9WktuN9j-z/'
// X_URL ?
const TWITTER_URL = 'https://twitter.com/jen_degen/status/1458167531869458440'

describe('Savefrom', async (t) => {
    it('Download Youtube', async () => {
        const data = await savefrom(YT_URL)
        assert.ok(data.length > 0)
    })
    
    // await t.test('Download Instagram', async () => {
    //     const data = await savefrom(IG_URL)
    //     assert.strictEqual(data.length > 0, true)
    // })

    // await t.test('Download Tiktok', async () => {
    //     const data = await savefrom(TIKTOK_URL)
    //     assert.strictEqual(data.length > 0, true)
    // })

    // await t.test('Download Facebook', async () => {
    //     const data = await savefrom(FB_URL)
    //     assert.strictEqual(data.length > 0, true)
    // })

    // await t.test('Download Twitter (X)', async () => {
    //     const data = await savefrom(TWITTER_URL)
    //     assert.strictEqual(data.length > 0, true)
    // })
})