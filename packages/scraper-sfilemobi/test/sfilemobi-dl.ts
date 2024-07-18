import got from 'got'
import { describe, it } from 'node:test'
import assert from 'node:assert'
import { sfilemobi } from '../index.js'
import type { Sfilemobidl } from '../types/sfilemobi-dl.js'

const SFILEMOBI_URL = 'https://sfile.mobi/3PxKBxHAasM'

describe('Sfilemmobi Downloader', async (t) => {
    let metadata: Sfilemobidl

    it('Getting Metadata', async () => {
        metadata = await sfilemobi(SFILEMOBI_URL)
    })

    it('Download Content', async (t) => {
        if (!metadata)
            return t.skip('Test skipped -- error in getting metadata!')
        const buffer = await got(metadata.url).buffer()
        assert.ok(buffer.byteLength > 0)
    })
})