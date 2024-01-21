import { test } from 'node:test'
import assert from 'node:assert'
import { sfilemobiSearch } from '../index.js'

const SFILEMOBI_QUERY = 'Minecraft'

test('Sfilemmobi Search', async (t) => {
    await t.test('Search', async () => {
        const results = await sfilemobiSearch(SFILEMOBI_QUERY)
        assert.strictEqual(results.length > 0, true)
    })
})