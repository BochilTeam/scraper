import got from 'got'
import { test } from 'node:test'
import assert from 'node:assert'
import { sfilemobi } from '../index.js'
import type { Sfilemobidl } from '../types/sfilemobi-dl.js'

const SFILEMOBI_URL = 'https://sfile.mobi/3PxKBxHAasM'

test('Sfilemmobi Downloader', async (t) => {
    let metadata: Sfilemobidl
    await t.test('Getting Metadata', async () => {
        metadata = await sfilemobi(SFILEMOBI_URL)
    })

    await t.test('Download Content', async () => {
        if (!metadata)
            return t.skip('Test skipped -- error in getting metadata!')
        const buffer = await got(metadata.url).buffer()
        assert.strictEqual(buffer.byteLength > 0, true)
    })
})