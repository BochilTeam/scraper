import got from 'got'
import { test } from 'node:test'
import assert from 'node:assert'
import { mediafiredl } from '../index.js'
import type { Mediafiredl } from '../types/mediafire-dl.js'

const MEDIAFIRE_URL = 'https://www.mediafire.com/file/10q5c5wmzymsmhc/package.json/file'

test('Mediafire Downloader', async (t) => {
    let metadata: Mediafiredl
    await t.test('Getting Metadata', async () => {
        metadata = await mediafiredl(MEDIAFIRE_URL)
    })

    await t.test('Download Content', async () => {
        if (!metadata)
            return t.skip('Test skipped -- error in getting metadata!')
        const buffer = await got(metadata.url).buffer()
        assert.strictEqual(buffer.byteLength > 0, true)
    })
})