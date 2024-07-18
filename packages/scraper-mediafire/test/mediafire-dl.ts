import { describe, it } from 'node:test'
import assert from 'node:assert'
import got from 'got'
import { mediafiredl } from '../index.js'
import type { Mediafiredl } from '../types/mediafire-dl.js'

const MEDIAFIRE_URL = 'https://www.mediafire.com/file/laehkb9142vkuh3/MediaFire_-_Getting_Started.pdf/file'

describe('Mediafire Downloader', async (t) => {
    let metadata: Mediafiredl
    it('Getting Metadata', async () => {
        metadata = await mediafiredl(MEDIAFIRE_URL)
        assert.strictEqual(metadata.filename, 'MediaFire - Getting Started.pdf')
        assert.strictEqual(metadata.filetype, 'PDF')
        assert.strictEqual(metadata.filesizeH, '372.37KB')
        assert.strictEqual(metadata.aploud, '2017-01-07 12:16:54')
    })

    it('Download Content', async (t) => {
        if (!metadata)
            return t.skip('Test skipped -- error in getting metadata!')
        const buffer = await got(metadata.url).buffer()
        assert.ok(buffer.byteLength >= metadata.filesize)
    })
})