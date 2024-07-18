import { describe, it } from 'node:test'
import assert from 'node:assert'
import got from 'got'
import { facebookdl } from '../index.js'
import { FacebookDl } from '../types/facebook-v1.js'

const FB_URL = 'https://fb.watch/9WktuN9j-z/'

describe('Facebook Downloader', async () => {

    let result: FacebookDl
    it('Getting Metadata', async () => {
        result = await facebookdl(FB_URL)
    })

    it('Download a Video', async () => {
        const video = result.video[0]
        console.debug('Download video with quality: ', video.quality)
        const url = await video.download()
        const buffer = await got(url).buffer()
        assert.ok(buffer.byteLength > 1)
    })
})